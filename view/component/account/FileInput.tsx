import { BlackButton } from '@component/StandardButton';
import { Avatar, Box, SxProps, styled } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

export type FileInputProps = React.ButtonHTMLAttributes<HTMLInputElement> & {
    sx?: SxProps;
    textContent?: string;
    name: string;
    mode?: 'circle' | 'box';
    url?: 'url';
    alt?: string;
};

const ImageZoomDim = styled(Box)(({ theme }) => ({
    position: 'fixed',
    zIndex: '9999',
    top: '0',
    left: '0',
    width: '100dvw',
    height: '100dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexWrap: 'wrap-reverse',
    '& div': {
        border: 'solid 20px white',
    },

    '& div img': {
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: 'attr(width) / attr(height)',
        imageRendering: 'auto',
    },
}));

type ThumbnailInfo = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    webkitRelativePath: string;
    url: string;
};

export const FileInputThumbnail = ({
    sx,
    textContent,
    name,
    id,
    mode = 'box',
    url,
    alt,
}: FileInputProps) => {
    const [thumbnailInfo, setThumbnailInfo] = useState<ThumbnailInfo | null>(
        null
    );
    const [isZoomImage, setIsZoomImage] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setThumbnailInfo(null);
            //alert('파일에 문제가 있어 프로필 이미지 호출에 실패하였습니다.');
            return;
        }
        const { name, size, type, lastModified, webkitRelativePath } = file;
        console.log(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailInfo({
                    name,
                    size,
                    type,
                    lastModified,
                    webkitRelativePath,
                    url: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailInfo(null);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '1dvw',
                ...sx,
            }}
        >
            <BlackButton
                onClick={() => {
                    if (!fileInputRef.current) return;
                    fileInputRef.current.click();
                }}
            >
                {textContent}
            </BlackButton>
            <input
                id="file-upload"
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
                name={name}
                ref={fileInputRef}
                onBlur={e => {}}
            />
            {(thumbnailInfo || url) && (
                <>
                    {(mode === 'box' && (
                        <Box
                            component="img"
                            src={thumbnailInfo?.url || url}
                            alt={thumbnailInfo?.name || alt}
                            onClick={() => setIsZoomImage(true)}
                            sx={{
                                display: 'block',
                                marginTop: '2vh',
                                maxWidth: '20%',
                                borderRadius: '12px',
                                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                transition:
                                    'transform 0.3s ease, box-shadow 0.3s ease',
                                objectFit: 'cover',

                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.5)',
                                },
                            }}
                        />
                    )) || (
                        <Avatar
                            src={thumbnailInfo?.url || url}
                            alt={thumbnailInfo?.name || alt}
                            onClick={() => setIsZoomImage(true)}
                            sx={{
                                width: 64,
                                height: 64,
                            }}
                        ></Avatar>
                    )}
                </>
            )}
            {isZoomImage && thumbnailInfo && (
                <ImageZoomDim onClick={() => setIsZoomImage(false)}>
                    <div>
                        <img
                            src={thumbnailInfo.url}
                            alt={thumbnailInfo.name}
                        ></img>
                    </div>
                </ImageZoomDim>
            )}
        </Box>
    );
};
