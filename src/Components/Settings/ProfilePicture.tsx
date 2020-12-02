import React, { useContext, useEffect, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { uploadPhoto } from '../../firebase/user';

export default function ProfilePicture(props:
    { submit: boolean, photoURL: UserSchema['photoURL'], setFieldValue: Function }
){
    const { photoURL, uid } = useContext(UserContext)!;
    const [newPhotoURI, setNewPhotoURI] = useState<any>(undefined);
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (!props.submit || !file) return;

        async function handleUpload() {
            if (!file) return;
            console.log('here');
            const newURL = await uploadPhoto(file, uid);
            console.log(newURL);
            
        }

        handleUpload();

    }, [props.submit, file, uid])

    function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            let reader = new FileReader();
            reader.onload = (event) => {
                setNewPhotoURI(event.target?.result)
            }
            setFile(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <StyledProfilePicture>
            <img src={photoURL} alt="profile" />
            {newPhotoURI ? <img src={newPhotoURI} alt=''/> : null}
            <StyledUploadButton>
                <MdAddAPhoto />
                <label htmlFor="photo-upload"></label>
                <input type="file" id="photo-upload" accept="image/*" onChange={handlePreview}/>
            </StyledUploadButton>
        </StyledProfilePicture>
    )
}

const StyledProfilePicture = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    > img {
        height: 100%;
        width: auto;
        border: 2px solid ${props => props.theme.verydark};
        margin-right: 10px;
    }
`;

const StyledUploadButton = styled.div`
    position: relative;
    height: 100%;
    width: 100px;
    border: 2px solid ${props => props.theme.verydark};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > svg {
        height: 30px;
        width: auto;
    }
    > label {
        position: absolute;
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
    > input {
        position: absolute;
        height: 100%;
        width: 100%;
        display: none;
    }
`;