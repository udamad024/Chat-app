import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = async (audioBlob) => {
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'audio1020131',
        Key: `audio/${Date.now()}.webm`, // Generate a unique key
        Body: audioBlob,
        ContentType: 'audio/webm'
    };
    return s3.upload(params).promise();
};

const transcribeSpeech = async (audioBlob) => {
    const audioData = await fetch(audioBlob).then((res) => res.blob());
    const s3Response = await uploadToS3(audioData);

    const params = {
        LanguageCode: 'en-US', // Update with appropriate language code
        Media: {
            MediaFileUri: s3Response.Location
        },
        MediaFormat: 'webm',
        TranscriptionJobName: `speech-to-text-job-${Date.now()}` // Provide a unique job name
    };

    const transcribeService = new AWS.TranscribeService();
    return transcribeService.startTranscriptionJob(params).promise();
};


const getTranscriptionResult = async (jobName) => {
    const params = {
        TranscriptionJobName: jobName
    };

    const transcribeService = new AWS.TranscribeService();
    const { TranscriptionJob } = await transcribeService.getTranscriptionJob(params).promise();
    
    if (TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
        return fetch(TranscriptionJob.Transcript.TranscriptFileUri)
            .then((res) => res.json())
            .then((data) => data.results.transcripts[0].transcript);
    } else if (TranscriptionJob.TranscriptionJobStatus === 'FAILED') {
        throw new Error('Transcription job failed');
    } else {
        throw new Error('Transcription job is still in progress');
    }
};

export { transcribeSpeech, getTranscriptionResult };
