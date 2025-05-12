import Poster from "../Models/Poster.js";
// ✅ Create a new poster
export const createPoster = async (req, res) => {
  try {
    const {
      name,
      categoryName,
      price,
      description,
      size,
      festivalDate, // Festival Date should be a string
      inStock,
      tags
    } = req.body;

    // Handle images: Check if 'images' or 'image' exists in req.files
    let images = [];

    if (req.files['images']) {
      images = req.files['images'].map(file => `uploads/${file.filename}`); // Prepend 'uploads/' to the filename for multiple files
    }

    if (req.files['image']) {
      // If 'image' field exists, it's a single file
      images.push(`uploads/${req.files['image'][0].filename}`); // Prepend 'uploads/' to the filename for a single file
    }

    const newPoster = new Poster({
      name,
      categoryName,
      price,
      images,  // Store all image URLs with 'uploads/' path
      description,
      size,
      festivalDate: festivalDate || null, // Save festival date as string
      inStock,
      tags
    });

    const savedPoster = await newPoster.save();

    // Send the saved poster response, including the images with 'uploads/' path
    res.status(201).json(savedPoster);
  } catch (error) {
    res.status(500).json({ message: 'Error creating poster', error });
  }
};

  
  
// ✅ Get all posters
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find().sort({ createdAt: -1 });
    res.status(200).json(posters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posters', error });
  }
};


// ✅ Get posters by categoryName
export const getPostersByCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: 'categoryName is required' });
    }

    const posters = await Poster.find({ categoryName }).sort({ createdAt: -1 });

    res.status(200).json(posters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posters by categoryName', error });
  }
};


// ✅ Get all posters from "Beauty Products" category
export const getAllPostersBeauty = async (req, res) => {
    try {
      const posters = await Poster.find({ categoryName: "Beauty Products" }).sort({ createdAt: -1 });
      res.status(200).json(posters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posters', error });
    }
  };


// ✅ Get all Chemical category posters
export const getChemicalPosters = async (req, res) => {
    try {
      const chemicalPosters = await Poster.find({ categoryName: "Chemical" }).sort({ createdAt: -1 });
      
      res.status(200).json(chemicalPosters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching chemical posters', error });
    }
  };

  
// ✅ Get all Clothing category posters
export const getClothingPosters = async (req, res) => {
    try {
      const clothingPosters = await Poster.find({ categoryName: "Clothing" }).sort({ createdAt: -1 });
      
      res.status(200).json(clothingPosters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching clothing posters', error });
    }
  };


// ✅ Get all Ugadi category posters
export const getUgadiPosters = async (req, res) => {
    try {
      const ugadiPosters = await Poster.find({ categoryName: "Ugadi" }).sort({ createdAt: -1 });
  
      res.status(200).json(ugadiPosters);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Ugadi posters', error });
    }
  };
  
  

// ✅ Get a single poster by ID
export const getSinglePoster = async (req, res) => {
  try {
    const { id } = req.params;
    const poster = await Poster.findById(id);

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    res.status(200).json(poster);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching poster', error });
  }
};


export const getPostersByFestivalDates = async (req, res) => {
  try {
    const { festivalDate } = req.body;

    if (!festivalDate) {
      return res.status(400).json({ message: "Festival date is required" });
    }

    const posters = await Poster.find({ festivalDate }).sort({ createdAt: -1 });

    if (posters.length === 0) {
      return res.status(404).json({ message: "No posters found for this festival date" });
    }

    res.status(200).json(posters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posters", error });
  }
};

