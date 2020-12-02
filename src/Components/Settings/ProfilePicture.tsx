import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdAddAPhoto } from 'react-icons/md';
import { UserContext } from '../../Application';

export default function ProfilePicture(props: { setImageFile: Function }) {
    const { photoURL, providerPhotoURL } = useContext(UserContext)!;
    const [newPhotoURI, setNewPhotoURI] = useState<any>(undefined);
    const [selected, setSelected] = useState(0);

    // [TODO]: needs selected refactoring

    // function handleImageSelect(e: React.SyntheticEvent<HTMLImageElement>) {

    // }

    function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            let reader = new FileReader();
            reader.onload = (event) => {
                setNewPhotoURI(event.target?.result)
            }
            props.setImageFile(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0])
            setSelected(2)
        }
    }

    function ProviderPhoto() {
        if (photoURL === providerPhotoURL) {
            return null;
        } else {
            return (
                <img
                    src={providerPhotoURL}
                    alt=""
                    className={selected === 1 ? 'selected' : ''}
                    onClick={() => setSelected(1)}
                />
            )
        }
    }

    return (
        <StyledProfilePicture>
            <img
                src={photoURL}
                alt="profile"
                className={selected === 0 ? 'selected' : ''}
                onClick={() => setSelected(0)}
            />
            <ProviderPhoto />
            {newPhotoURI ?
                <img
                    src={newPhotoURI}
                    alt=''
                    className={selected === 2 ? 'selected' : ''}
                    onClick={(e) => {
                        setSelected(2);
                        // props.setImageFile()
                    }}
                /> :
                null
            }
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
        cursor: pointer;
    }
    > img.selected {
        border: 2px solid ${props => props.theme.green};
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