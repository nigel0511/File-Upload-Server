import express, { Request, Response, Router, NextFunction } from "express";
import { MetaService } from "../service/MetaService";
import { upload } from "../multer/config";

const router: Router = express.Router();
const metaService = new MetaService(); // Instantiate the MetaService
// Create a new Meta record
router.post(
  "/meta",
  upload.single("video"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the incoming data, you can also use a validation library like `class-validator`
      const { title, startDateTime, location, fileSize, format } = req.body;

      // Ensure the required fields are provided
      if (!title || !startDateTime || !fileSize || !format) {
        res.status(400).json({ message: "Missing required fields" });
      }

      // Call the service to create a new Meta record
      const newMeta = await metaService.createMeta({
        title,
        startDateTime,
        location,
        fileSize,
        format,
        uploadDate: new Date().toISOString(),
      });

      res.status(201).json({ message: "Uploaded Successfully." }); // Return the newly created Meta record
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating Meta record", error: error.message });
    }
  }
);

// Get all Meta records
router.get("/meta", async (req: Request, res: Response) => {
  try {
    const metas = await metaService.getAllMetas(); // Get all metas using the service
    res.status(200).json(metas); // Return the list of metas
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching Meta entries", error: error.message });
  }
});

// Get a specific Meta by ID
router.get("/meta/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
    }

    const meta = await metaService.getMetaById(id); // Get a single meta record by ID
    if (!meta) {
      res.status(404).json({ message: "Meta record not found" });
    }

    res.status(200).json(meta); // Return the Meta record
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching Meta entry", error: error.message });
  }
});

// Update a Meta record by ID
router.put("/meta/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
    }

    const updatedData = req.body;
    const updatedMeta = await metaService.updateMeta(id, updatedData); // Update meta by ID

    if (!updatedMeta) {
      res.status(404).json({ message: "Meta record not found" });
    }

    res.status(200).json(updatedMeta); // Return the updated Meta record
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating Meta entry", error: error.message });
  }
});

// Delete a Meta record by ID
router.delete("/meta/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
    }

    await metaService.deleteMeta(id); // Delete meta by ID
    res.status(204).send(); // Return no content as response after successful deletion
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting Meta entry", error: error.message });
  }
});

export default router;
