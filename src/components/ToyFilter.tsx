import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

import type { FilterState } from "../interface";

interface ToyFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

function ToyFilter({ filters, onFilterChange }: ToyFilterProps) {
  const handleMaterialChange = (material: string) => {
    let newMaterials = [...filters.materials];

    if (newMaterials.includes(material)) {
      newMaterials = newMaterials.filter((item) => item !== material);
    } else {
      newMaterials.push(material);
    }

    onFilterChange({
      ...filters,
      materials: newMaterials,
    });
  };

  return (
    <Box
      sx={{
        width: "230px",
        minWidth: "230px",
        p: 3,
        border: "1px solid #eeeeee",
        borderRadius: "15px",
      }}
    >
      {/* Filter Heading */}
      <Typography
        sx={{
          fontFamily: '"Baloo 2", sans-serif',
          fontSize: "1.5rem",
          fontWeight: 600,
          mb: 3,
        }}
      >
        Filter
      </Typography>

      {/* Availability */}
      <Typography
        sx={{
          fontFamily: '"Baloo 2", sans-serif',
          fontSize: "1.2rem",
          fontWeight: 600,
          mb: 1,
        }}
      >
        Availability
      </Typography>

      <FormGroup>
        {/* In Stock */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.inStock}
              onChange={(event) => {
                onFilterChange({
                  ...filters,
                  inStock: event.target.checked,
                });
              }}
            />
          }
          label="In Stock"
        />

        {/* Out of Stock */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.outOfStock}
              onChange={(event) => {
                onFilterChange({
                  ...filters,
                  outOfStock: event.target.checked,
                });
              }}
            />
          }
          label="Out of Stock"
        />
      </FormGroup>

      {/* Material */}
      <Typography
        sx={{
          fontFamily: '"Baloo 2", sans-serif',
          fontSize: "1.2rem",
          fontWeight: 600,
          mt: 3,
          mb: 1,
        }}
      >
        Material
      </Typography>

      <FormGroup>
        {/* Plastic */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.materials.includes("Plastic")}
              onChange={() => {
                handleMaterialChange("Plastic");
              }}
            />
          }
          label="Plastic"
        />

        {/* Woolen */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.materials.includes("Woolen")}
              onChange={() => {
                handleMaterialChange("Woolen");
              }}
            />
          }
          label="Woolen"
        />

        {/* Crochet */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.materials.includes("Crochet")}
              onChange={() => {
                handleMaterialChange("Crochet");
              }}
            />
          }
          label="Crochet"
        />

        {/* Wooden */}
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.materials.includes("wooden")}
              onChange={() => {
                handleMaterialChange("wooden");
              }}
            />
          }
          label="Wooden"
        />
      </FormGroup>

      {/* Price */}
      <Typography
        sx={{
          fontFamily: '"Baloo 2", sans-serif',
          fontSize: "1.2rem",
          fontWeight: 600,
          mt: 3,
          mb: 1.5,
        }}
      >
        Price
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        {/* From */}
        <TextField
          size="small"
          label="From"
          type="number"
          value={filters.minPrice === 0 ? "" : filters.minPrice}
          onChange={(event) => {
            onFilterChange({
              ...filters,
              minPrice: Number(event.target.value),
            });
          }}
        />

        {/* To */}
        <TextField
          size="small"
          label="To"
          type="number"
          value={filters.maxPrice === 0 ? "" : filters.maxPrice}
          onChange={(event) => {
            onFilterChange({
              ...filters,
              maxPrice: Number(event.target.value),
            });
          }}
        />
      </Box>
    </Box>
  );
}

export default ToyFilter;
