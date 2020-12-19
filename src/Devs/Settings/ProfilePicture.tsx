import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdAddAPhoto } from 'react-icons/md';
import { CurrentDevContext } from '../../Application';
import useUpdateProfile from '../util/useUpdateProfile';

export default function ProfilePicture() {
    const { profile, user } = useContext(CurrentDevContext)!;
    const [imagePreviews, setImagePreviews] = useState<string[]>([
        profile.image_url,
    ]);
    const [pendingImages, setPendingImages] = useState<Array<string | File>>([
        profile.image_url,
    ]);
    const [selected, setSelected] = useState(0);
    const providerImage = user.providerData[0]?.photoURL;
    const { uploadImage } = useUpdateProfile();
    const imageToUpload: React.MutableRefObject<string | File> = useRef(
        profile.image_url,
    );

    console.log(imageToUpload.current);

    useEffect(() => {
        if (providerImage) {
            setImagePreviews((prev) => [...prev, providerImage]);
        }
    }, [providerImage]);

    useEffect(() => {
        console.log(pendingImages);
        imageToUpload.current = pendingImages[selected];
    }, [pendingImages, selected]);

    useEffect(() => {
        return () => {
            (async () => {
                console.log('unmounting');
                await uploadImage(imageToUpload.current, profile);
                console.log('unmounted');
            })();
        };
        // eslint-disable-next-line
    }, []);

    const reader = new FileReader();
    reader.onload = (event) => {
        let imageURI = event.target?.result;
        if (typeof imageURI === 'string') {
            setImagePreviews((prev) => [...prev, imageURI as string]);
        }
    };

    function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            console.log(files[0]);
            setSelected(imagePreviews.length);
            reader.readAsDataURL(files[0]);
            setPendingImages((prev) => [...prev, files[0]]);
        }
    }

    return (
        <StyledProfilePicture>
            {imagePreviews.map((image, i: number) => {
                return (
                    <img
                        src={image}
                        alt=""
                        key={i}
                        className={selected === i ? 'selected' : ''}
                        onClick={() => {
                            setSelected(i);
                        }}
                    />
                );
            })}
            <StyledUploadButton>
                <MdAddAPhoto />
                <label htmlFor="photo-upload"></label>
                <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePreview}
                />
            </StyledUploadButton>
        </StyledProfilePicture>
    );
}

const StyledProfilePicture = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    > img {
        height: 100%;
        width: auto;
        border: 2px solid ${(props) => props.theme.verydark};
        margin-right: 10px;
        cursor: pointer;
    }
    > img.selected {
        border: 2px solid ${(props) => props.theme.green};
    }
`;

const StyledUploadButton = styled.div`
    position: relative;
    height: 100%;
    width: 100px;
    border: 2px solid ${(props) => props.theme.verydark};
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
