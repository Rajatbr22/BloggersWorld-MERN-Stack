import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { supabase } from '../superbase'



const DashProfile = () => {

    // const { currentUser, error, loading } = useSelector(state => state.user)
    // const [ imageFile, setImageFile ] = useState(null);
    // const [imageFileUrl, setImageFileUrl] = useState(null);
    // const [formData, setFormData] = useState({});
    // const [ imageFileUploadProgress, setImageFileUploadProgress ] = (null);

    // const [ imageFileUploadError, setImageFileUploadError ] = useState(null);

    // const [ imageFileUploading, setImageFileUploading ] = useState(null);



    // const [ showModal, setShowModal ] = useState(false);
    // const filePickerRef = useRef();
    // const dispatch = useDispatch();

    // console.log(imageFileUploadProgress, imageFileUploadError);
    
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() =>{
        if(imageFile){
            uploadImage();
        }

    }, [imageFile])

    const uploadImage = async () => {
    try {
        setImageFileUploading(true);
        setImageFileUploadError(null);

        // Validate file size (2MB = 2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (imageFile.size > maxSize) {
            setImageFileUploading(false);
            setImageFileUploadError('File size exceeds the 2MB limit.');

            setTimeout(() =>{
                setImageFileUploadError();
            }, 5000)
            return;
        }

        // Generate unique file name
        const fileName = `${currentUser._id}-${Date.now()}-${imageFile.name}`;

        // Upload the image to Supabase storage
        const { data, error } = await supabase.storage
            .from('Images-BloggersWorld-MERN') // Replace with your bucket name
            .upload(fileName, imageFile, {
                upsert: false,
            });

        if (error) {
            setImageFileUploadError('Could not upload image. Please try again.');
            setImageFileUploading(false);
            return;
        }

        // Get public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
            .from('Images-BloggersWorld-MERN')
            .getPublicUrl(fileName);

        if (publicUrlData.publicUrl) {
            setImageFileUrl(publicUrlData.publicUrl);
            setFormData({ ...formData, profilePicture: publicUrlData.publicUrl });
        }

        setImageFileUploading(false);
    } catch (err) {
        setImageFileUploadError('Unexpected error occurred. Please try again.');
        setImageFileUploading(false);
    }
};


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }; 


    const handleSubmit = async (e) => {
            e.preventDefault();
            setUpdateUserError(null);
            setUpdateUserSuccess(null);
            if (Object.keys(formData).length === 0) {
                setUpdateUserError('No changes made');
                setTimeout(() => {
                    setUpdateUserError();
                }, 5000);
                return;
            }
            if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            return;
            }
            try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");

                setTimeout(() =>{
                    setUpdateUserSuccess();
                }, 5000)
            }
            } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
            }
    };
    

    const handleDeleteUser = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            })

            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message))
            }
            else{
                dispatch(deleteUserSuccess(data));
            }
        } 
        catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })

            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            else{
                dispatch(signOutSuccess());
            }
        } 
        catch (error) {
            console.log(error);
            
        }
    }
    
    return (
            <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
            />
            <div
            className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
            onClick={() => filePickerRef.current.click()}
            >
            {imageFileUploadProgress && (
                <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                    root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    },
                    path: {
                    stroke: `rgba(62, 152, 199, ${
                        imageFileUploadProgress / 100
                    })`,
                    },
                }}
                />
            )}
            <img
                src={imageFileUrl || currentUser.profilePicture}
                alt='user'
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                'opacity-60'
                }`}
            />
            </div>
            {imageFileUploadError && (
            <Alert color='failure'>{imageFileUploadError}</Alert>
            )}
            <TextInput
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}
            onChange={handleChange}
            />
            <TextInput
            type='email'
            id='email'
            placeholder='email'
            defaultValue={currentUser.email}
            onChange={handleChange}
            />
            <TextInput
            type='password'
            id='password'
            placeholder='password'
            onChange={handleChange}
            />
            <Button
            type='submit'
            gradientDuoTone='purpleToBlue'
            outline
            disabled={loading || imageFileUploading}
            >
            {loading ? 'Loading...' : 'Update'}
            </Button>
            {currentUser.isAdmin && (
            <Link to={'/create-post'}>
                <Button
                type='button'
                gradientDuoTone='purpleToPink'
                className='w-full'
                >
                Create a post
                </Button>
            </Link>
            )}
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span onClick={() => setShowModal(true)} className='cursor-pointer'>
            Delete Account
            </span>
            <span onClick={handleSignOut} className='cursor-pointer'>
            Sign Out
            </span>
        </div>
        {updateUserSuccess && (
            <Alert color='success' className='mt-5'>
            {updateUserSuccess}
            </Alert>
        )}
        {updateUserError && (
            <Alert color='failure' className='mt-5'>
            {updateUserError}
            </Alert>
        )}
        {error && (
            <Alert color='failure' className='mt-5'>
            {error}
            </Alert>
        )}
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
        >
            <Modal.Header />
            <Modal.Body>
            <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete your account?
                </h3>
                <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
                    Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </div>
    )
}

export default DashProfile