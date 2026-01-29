// Optimized parallel image preloader with progress tracking

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class ImagePreloader {
  private loadedCount = 0;
  private totalImages = 0;
  private onProgressCallback?: (progress: PreloadProgress) => void;

  /**
   * Preload images in parallel batches for optimal performance
   * @param imagePaths Array of image paths to preload
   * @param onProgress Callback for progress updates
   * @param batchSize Number of images to load simultaneously (default: 10)
   */
  async preloadImages(
    imagePaths: string[],
    onProgress?: (progress: PreloadProgress) => void,
    batchSize: number = 10
  ): Promise<void> {
    this.totalImages = imagePaths.length;
    this.loadedCount = 0;
    this.onProgressCallback = onProgress;

    // Split images into batches for parallel loading
    const batches: string[][] = [];
    for (let i = 0; i < imagePaths.length; i += batchSize) {
      batches.push(imagePaths.slice(i, i + batchSize));
    }

    // Load batches sequentially, but images within each batch in parallel
    for (const batch of batches) {
      await Promise.all(batch.map((path) => this.loadImage(path)));
    }
  }

  /**
   * Load a single image and track progress
   */
  private loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedCount++;
        this.updateProgress();
        resolve();
      };

      img.onerror = () => {
        // Still count as loaded to prevent hanging
        this.loadedCount++;
        this.updateProgress();
        console.warn(`Failed to load image: ${src}`);
        resolve(); // Resolve instead of reject to continue loading
      };

      img.src = src;
    });
  }

  /**
   * Update progress and call callback
   */
  private updateProgress(): void {
    if (this.onProgressCallback) {
      const progress: PreloadProgress = {
        loaded: this.loadedCount,
        total: this.totalImages,
        percentage: Math.round((this.loadedCount / this.totalImages) * 100),
      };
      this.onProgressCallback(progress);
    }
  }

  /**
   * Generate frame paths for sequences
   */
  static generateFramePaths(
    folder: string,
    count: number,
    prefix: string = "ezgif-frame-"
  ): string[] {
    return Array.from({ length: count }, (_, i) => {
      const frameNumber = String(i + 1).padStart(3, "0");
      return `/${folder}/${prefix}${frameNumber}.jpg`;
    });
  }
}

// Singleton instance
export const imagePreloader = new ImagePreloader();
