// /data/sectionsData.ts

export interface SectionData {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  reverse?: boolean;
}

export const sectionsData: SectionData[] = [
  {
    title: "Bedrooms",
    description: "Modern and comfortable bedroom designs for the whole family.",
    image: "https://plus.unsplash.com/premium_photo-1661963058256-5358560f4c6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVkcm9vbXMlMjBNb2Rlcm4lMjBhbmQlMjBjb21mb3J0YWJsZSUyMGJlZHJvb20lMjBkZXNpZ25zJTIwZm9yJTIwdGhlJTIwd2hvbGUlMjBmYW1pbHkufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    buttonText: "See More",
    buttonLink: "/bedrooms",
    reverse: false,
  },
  {
    title: "Kids Rooms",
    description: "Fun and inspiring ideas for kids' rooms.",
    image: "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fEZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    buttonText: "See More",
    buttonLink: "/kids",
    reverse: true,
  },
  {
    title: "Living Rooms",
    description: "Spacious and stylish designs for your living areas.",
    image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fEZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    buttonText: "See More",
    buttonLink: "/living",
    reverse: false,
  },
  {
    title: "Kitchens",
    description: "Modern and practical kitchens to suit all needs.",
    image: "https://images.unsplash.com/photo-1609248419815-e9ba18851962?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnVybml0dXJlJTIwS2l0Y2hlbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    buttonText: "See More",
    buttonLink: "/kitchen",
    reverse: true,
  },
];
