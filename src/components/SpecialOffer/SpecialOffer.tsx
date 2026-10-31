import { Box, Grid, Typography } from "@mui/material";
import CommonButton from "../Common/CommonButton";
import specialOffer from "../../assets/specialOffer3.jpg";
// import { SpecialOffers } from "../data/SpecialOffer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import type { SpecialOffer as SpecialOfferData } from "../../interface";
import offerUrl from "../../utils/SpecialOffer.json?url";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

function SpecialOfferSection() {
  const { data: offer } = useFetch<SpecialOfferData>(offerUrl);
  const navigate = useNavigate();
  return (
    <div>
      <Grid container justifyContent="center" sx={{ pt: 15 }}>
        <Grid size={{ lg: 10, xs: 12 }}>
          {/* Added this Grid container */}
          <Grid container spacing={4} alignItems="center">
            {/* Left Side */}
            <Grid
              size={{ lg: 6, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,

                "& .MuiTypography-root": {
                  fontFamily: '"Baloo 2", sans-serif',
                  textAlign: "center",
                },
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: 500 }}>
                Special Offer
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Make play time a blast with our finest toys and games!
              </Typography>

              <CommonButton text="Shop Now" color="white" backColor="#f37e7e" />

              <Box
                component="img"
                src={specialOffer}
                alt="Teddy"
                sx={{
                  width: 400,
                  pt: 10,
                }}
              />
            </Grid>

            {/* Right Side */}
            <Grid
              size={{ lg: 6, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,

                "& .MuiTypography-root": {
                  fontFamily: '"Baloo 2", sans-serif',
                  textAlign: "center",
                },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                Top Picks for Youngsters
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Make play time a blast with our finest toys and games!
              </Typography>

              <Grid container spacing={3} sx={{ mt: 3 }}>
                {offer.map((item) => (
                  <Grid
                    key={item.id}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    onClick={() => navigate(`/product/${item.id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box
                      sx={{
                        border: "1px dashed #000000",
                        borderRadius: 5,
                        p: 2,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          height: 250,
                          objectFit: "cover",
                          p: 2,
                          mt: 3,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        mt: 2,
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography sx={{ mt: 1, fontSize: "1.5rem" }}>
                      <CurrencyRupeeIcon
                        sx={{ fontSize: "18", verticalAlign: "middle" }}
                      />
                      {item.price}

                      <Typography
                        component="span"
                        sx={{
                          ml: 2,
                          color: "gray",
                          textDecoration: "line-through",
                          fontSize: "1rem",
                        }}
                      >
                        ₹{item.MRP}
                      </Typography>

                      <Typography
                        component="span"
                        sx={{
                          ml: 2,
                          color: "green",
                          fontWeight: 600,
                          fontSize: "1rem",
                        }}
                      >
                        {Math.round(((item.MRP - item.price) / item.MRP) * 100)}
                        % OFF
                      </Typography>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default SpecialOfferSection;
