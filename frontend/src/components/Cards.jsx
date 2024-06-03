import React from 'react'

const Cards = ({foodName, options, imgSrc}) => {

  const priceOptions=Object.keys(options)
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem","maxHeight":"360px" }}>
          <img src={imgSrc} className="card-img-top" height={200} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{foodName}</h5>
            <p className="card-text">
                This is imp
            </p>
            <div className="container w-100">
                <select className="m-2 h-100 bg-success rounded">
                    {Array.from(Array(6),(e,i)=>{
                        return(<option value={i+1} key={i+1}>{i+1}</option>)
                    })}
                </select>
                <select className="m-2 h-100 bg-success rounded" id="">
                    {priceOptions.map((option)=>{
                      return <option key={option} value={option}>{option}</option>
                    })}
                </select>

                <div className="d-inline h-100 fs-5">
                    Total Prize
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cards
