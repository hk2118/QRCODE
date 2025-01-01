import { useState } from "react"

export const QrCode=()=>{
    const [img,setImg]=useState('')
    const [loading,setLoading]=useState(false)
    const [qrData,setQrData]=useState('')
    const [qrSize,setQrSize]=useState('')
    
    async function generate(){
        if(!qrData  ){
            alert('please enter data and generate it....')
            return
        }
        if(!qrSize ){
            alert('please enter data and generate it....')
            return
        }
       setLoading(true)
            try{
                const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
                setImg(url)
            }
            catch(error){
                console.error('generating qr error ',error)
            }
            finally{
                setLoading(false)
            }
    }
    function download() {
        if (!img) {
            alert('Please generate the QR code first!');
            return;
          }
        {img && fetch(img)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'qrCode.png'; // File name for the download
            document.body.appendChild(link); // Append the link to the document
            link.click(); // Programmatically click the link to trigger download
            document.body.removeChild(link); // Remove the link after download
            URL.revokeObjectURL(link.href); // Clean up the object URL
          })
          .catch((error) => {
            console.error('Download error: ', error);
          });
      }}
      
    return(
        <>
        <div className="container">
            <div className="row ">
                <div className="col text-center text-primary"><h1>Qr Code Generator</h1></div>
            </div>
            <div className="row ">
                <div className="col text-center text-danger">
                    {loading && <p>Please wait...</p>}
                </div>
                
                
            </div>
            <div className="row mt-3">
                <div className="col d-flex justify-content-center ">
                    {img && <img src={img} alt="Qrcode" />}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-8 offset-2">
                <label htmlFor="dataInput" className="input-label text-primary mb-3">Data for Qr code</label>
                <input type="text" id="dataInput" className="form-control" placeholder='Enter data for Qr Code' value={qrData} onChange={(e)=>{
                    setQrData(e.target.value)}} />
                <label htmlFor="sizeInput" className="input-label mt-3 text-primary mb-3">Image Size</label>
                <input type="text" id="sizeInput" className="form-control" placeholder='Enter image size' value={qrSize} onChange={(e)=>{
                    setQrSize(e.target.value)
                }}/>
                <div className="row mt-4 mb-3 ">
                    <div className="col d-flex justify-content-between">
                        <button className="btn btn-primary generate-button" onClick={generate} disabled={loading}>Generate Qr Code</button>
                        <button className="btn btn-success download-button" onClick={download}>Download Qr Code</button>
                    </div>
                </div>
                <div className="row mt-4 mb-5">
                    <div className="col text-center">
                        Designed by <i className="text-danger">Harikaran</i>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}