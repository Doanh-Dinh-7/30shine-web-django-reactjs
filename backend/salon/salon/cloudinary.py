import cloudinary
import cloudinary.uploader
from django.conf import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
    api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
)

def upload_image(file, folder="social_media"):
    """
    Upload an image to Cloudinary
    
    Args:
        file: The file to upload
        folder: The folder to store the image in Cloudinary
        
    Returns:
        dict: The upload result containing the secure URL
    """
    try:
        # Upload the image
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="auto"
        )
        return result
    except Exception as e:
        raise Exception(f"Error uploading image to Cloudinary: {str(e)}") 