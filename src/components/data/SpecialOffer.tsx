import type { SpecialOffer } from "../../interface";

import toy1 from "../../assets/toys/toy1.jpg";
import toy2 from "../../assets/toys/toy3.jpg";
import toy3 from "../../assets/toys/toy5.jpg";
import toy4 from "../../assets/toys/toy9.jpg";
import toy5 from "../../assets/toys/toy10.jpg";
import toy6 from "../../assets/toys/toy13.jpg";
export const SpecialOffers: SpecialOffer[] = [
  {
    id: 1,
    image: toy1,
    name: "Xylophone",
    price: 200,
    MRP: 350,
    category: "musical",
    material: "plastic",
  },
  {
    id: 2,
    image: toy2,
    name: "Musical Crab",
    price: 270,
    MRP: 380,
    category: "musical",
    material: "plastic",
  },
  {
    id: 3,
    image: toy3,
    name: "Soft Teddy",
    price: 350,
    MRP: 450,
    category: "soft toy",
    material: "woolen",
  },
  {
    id: 4,
    image: toy4,
    name: "Wooden Engine",
    price: 500,
    MRP: 670,
    category: "vehicle",
    material: "Wood",
  },
  {
    id: 5,
    image: toy5,
    name: "Wooden Airplane",
    price: 700,
    MRP: 860,
    category: "vehicle",
    material: "Wood",
  },
  {
    id: 6,
    image: toy6,
    name: "Scooter",
    price: 1050,
    MRP: 1200,
    category: "Bike",
    material: "Plastic",
  },
];
