// routes/posterRoutes.js
import express from 'express';
import {
  createPoster,
  getAllPosters,
  getSinglePoster,
  getPostersByFestivalDates,
  getAllPostersBeauty,
  getChemicalPosters,
  getClothingPosters,
  getUgadiPosters
} from '../Controller/PosterController.js';
import uploads from '../config/uploadConfig.js';

const router = express.Router();

router.post('/create-poster', uploads, createPoster);
router.get('/getallposter', getAllPosters); 
router.post('/festival', getPostersByFestivalDates); 
router.get('/single-poster/:id', getSinglePoster);    // GET /api/posters/:id
router.get('/beautyposter', getAllPostersBeauty); 
router.get('/chemicalposter', getChemicalPosters); 
router.get('/clothingposter', getClothingPosters);
router.get('/ugadiposter', getUgadiPosters);






export default router;
