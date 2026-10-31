import { Box, Grid, Typography } from "@mui/material";

import type { OfferToy } from "../../interface";

import offer1 from "../../assets/offer1.jpg";
import offer2 from "../../assets/offer2.jpg";
import offer3 from "../../assets/offer3.jpg";
import CommonButton from "../Common/CommonButton";
const offers: OfferToy[] = [
  {
    id: 1,
    title: "Wood toys for your kids",
    subtitle: "Get 20% flate your first purchase",
    image: offer1,
    btnText: "Shop Now ",
  },
  {
    id: 2,
    title: "Early black friday specials",
    subtitle: "Big discount 50% off on all order",
    image: offer2,
    btnText: "Shop Now ",
  },
  {
    id: 3,
    title: "The best thing for kids",
    subtitle: "Special offer gift voucher",
    image: offer3,
    btnText: "Shop Now ",
  },
];

function Offer() {
  return (
    <Box py={5} sx={{ pt: 5 }}>
      <br />
      <br />
      <br />
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <Grid container spacing={3}>
            {offers.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    height: 350,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                    "& .MuiTypography-root": {
                      fontFamily: '"Baloo 2", sans-serif',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 5,
                      color: "#000",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="500"
                      sx={{
                        width: "90%",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography sx={{ mt: 1, fontSize: "1.3rem" }}>
                      {item.subtitle}
                    </Typography>
                    <CommonButton
                      text="Shop Now"
                      color="white"
                      backColor="#f37e7e"
                      sx={{ mt: 3 }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Offer;
