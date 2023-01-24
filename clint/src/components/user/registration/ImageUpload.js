import { useRef, useState, useEffect } from 'react';

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const onFilePickHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
    }
    props.onInput({ id: props.id, image: pickedFile, isImage: fileIsValid });
  };
  const pickImageHandler = (e) => {
    filePickerRef.current.click();
  };
  return (
    <div>
      <input
        type='file'
        ref={filePickerRef}
        accept='.jpg, .png, .jpeg'
        id={props.id}
        onChange={onFilePickHandler}
        style={{ display: 'none' }}
      />
      <div>
        <div
          style={{ width: '150px', height: '150px', border: '1px solid black' }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt='Preview'
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          ) : (
            <p>Please pick a image!</p>
          )}
        </div>
        <button onClick={pickImageHandler}>PICK IMAGE</button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
