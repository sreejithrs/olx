import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { Spinner } from 'react-bootstrap';
import {FirebaseContext,AuthContext} from '../../store/Context'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'

const Create = () => {
  const [name,setName] =useState('');
  const [category,setCategory] =useState('');
  const [price,setPrice] =useState('');
  const [image,setImage] =useState('');
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const date= new Date()
  const [Loader,setLoader] =useState(false)
  const [Button,setButton] =useState(true)
  const handleSubmit = ()=>{
    setButton(false)
    setLoader(true)
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          user:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          setLoader(false)
          swal("Ad Posted!", "successfully").then(()=>{
            history.push('/')
          })
        })
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <div className='sell'>Sell</div>
            <div className='form'>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              name="Name"
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              name="category"
              onChange={(e)=>setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="fname" name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br/>
           {Button && <button onClick={handleSubmit} className="uploadBtn">Submit</button>}
          {Loader && <Spinner animation="border" className='loaderButton' role="status"></Spinner> }
            </div>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
