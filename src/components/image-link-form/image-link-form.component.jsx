import React from 'react';
import './image-link-form.styles.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {
                    'Magic Brain akan mendeteksi wajah di dalam gambar. Cobain deh!'
                }
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>
                        Deteksi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
