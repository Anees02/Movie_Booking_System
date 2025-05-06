import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import api from '../api/myaxios';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState(false)



  const formik = useFormik({
    initialValues: {
      name: '',
      cinema_hall: '',
      price: '',
      duration: '',
      code: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter the Movie Name"),
      cinema_hall: Yup.string().required("Please provide the cinema hall"),
      price: Yup.number().positive().required("Please Enter the price"),
      duration: Yup.string().required("Please Enter the Duration"),
      code: Yup.string().required("Please Enter the Secret Code"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        alert("Please upload an image");
        return;
      }

      setLoading(true)

      if(values.code === "Anees@1602"){
        
        setCode(false)
          const movie = {
            name: values.name,
            price: values.price,
            duration: values.duration
          };

          const formData = new FormData();
          formData.append("image", selectedFile);
          formData.append("movie", new Blob([JSON.stringify(movie)], { type: "application/json" }));
          try {
            const res = await api.post(
              `${import.meta.env.VITE_APP_URL}/movie/${values.cinema_hall}`,
              formData,
              
            );
            setLoading(false);
          navigate('/')
          } catch (err) {
            console.error(err);
          }
      }
      else{
        setCode(true)
      }

      
    }
  });

  return (
    <div className='movie-add-section'>
      <div className='movie-add'>
        <form onSubmit={formik.handleSubmit} method='POST' encType='multipart/form-data'>
          <div className='header'>
            <h2>Add Movie</h2>
            <p>Enter your Movie Details Below</p>
          </div>

          <div className='input-field'>
            <input type="text" id='name' placeholder='Enter the Movie Name' {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && <div className='error'>{formik.errors.name}</div>}
          </div>

          <div className='input-image'>
            <div className='field'>
              <label htmlFor="image">Image: </label>
              <input 
                type="file" 
                id='image' 
                name="image"
                onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
              />
            </div>
          </div>

          <div className='input-field'>
            <select id='cinema_hall' {...formik.getFieldProps('cinema_hall')}>
              <option value="" label="Select a Cinema Hall" />
              <option value="Hall1" label="Hall 1" />
              <option value="Hall2" label="Hall 2" />
              <option value="Hall3" label="Hall 3" />
            </select>
            {formik.touched.cinema_hall && formik.errors.cinema_hall && (
              <div className='error'>{formik.errors.cinema_hall}</div>
            )}
          </div>

          <div className='input-field'>
            <input type="text" id='price' placeholder='Enter the Price' {...formik.getFieldProps('price')} />
            {formik.touched.price && formik.errors.price && <div className='error'>{formik.errors.price}</div>}
          </div>

          <div className='input-field'>
            <input type="text" id='duration' placeholder='Enter the Duration' {...formik.getFieldProps('duration')} />
            {formik.touched.duration && formik.errors.duration && <div className='error'>{formik.errors.duration}</div>}
          </div>
          <div className='input-field'>
            <input type="text" id='code' placeholder='Enter the Secret' {...formik.getFieldProps('code')} />
            {formik.touched.code && formik.errors.code && <div className='error'>{formik.errors.code}</div>}
          </div>

          {loading && <div className='loading'>Please Wait</div>}
          {code && <div className='code'>You Entered the code was wrong, Please Try Again</div>}

          <button type="submit" className='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie
