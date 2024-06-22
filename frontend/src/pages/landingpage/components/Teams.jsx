import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const teamMembers = [
  {
    avatar: <Avatar alt="Ashen Udara" src="img/team/ashen.jpg" sx={{ width: {xs:140, sm:180, md:220}, height: {xs:140, sm:180, md:220} }} />,
    name: 'Ashen Udara',
    occupation: 'Code Alchemis'
  },
  {
    avatar: <Avatar alt="Faseh Mirza" src="img/team/faseh.jpg" sx={{ width: {xs:140, sm:180, md:220}, height: {xs:140, sm:180, md:220} }} />,
    name: 'Faseh Mirza',
    occupation: 'Logic Fyre'
  },
  {
    avatar: <Avatar alt="Harry Ghotra" src="img/team/harry.jpg" sx={{ width: {xs:140, sm:180, md:220}, height: {xs:140, sm:180, md:220} }} />,
    name: 'Harry Ghotra',
    occupation: 'Cloud Crafter'
  },
  {
    avatar: <Avatar alt="Jun-Jun Llave" src="img/team/jun.jpg" sx={{ width: {xs:140, sm:180, md:220}, height: {xs:140, sm:180, md:220} }} />,
    name: 'Jun-Jun Llave',
    occupation: 'Hyper Code'
  },
  {
    avatar: <Avatar alt="Kusal Thiwanka" src="img/team/kusal.jpg" sx={{ width: {xs:140, sm:180, md:220}, height: {xs:140, sm:180, md:220} }} />,
    name: 'Kusal Thiwanka',
    occupation: 'Byte Blaze'
  },
];

export default function Teams() {

  return (
    <Container
      id="teams"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" sx={{ color: 'text.primary', fontSize: 'clamp(2.5rem, 10vw, 3rem)', textTransform: 'none' }}>
          Team PROSPR
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 }, fontSize: 'clamp(1.2rem, 10vw, 1.5rem)', textTransform: 'none' }}>
          Meet the Visionaries Behind Our Inclusive Chat Experience
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={6} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  title={member.name}
                  subheader={member.occupation}
                  sx={{ textAlign: 'center', width: '100%' }}
                />
              </Box>
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {member.avatar}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
