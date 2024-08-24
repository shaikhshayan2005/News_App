import React from 'react';

const NewsItems =(props) => {
  
    // let { title = 'Title Unavailable', description = 'Description Unavailable', imageUrl, newsUrl, author = 'Unknown Author', date = new Date(), source } = this.props;
    let { title, description, imageUrl, newsUrl, author, date, source } = props; // Destructuring props
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}} >
            <span className="badge rounded-pill bg-danger">{source ? source.slice(0, 11) : 'unavailable'}...</span>
          </div>
          <img src={!imageUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/photo-08-male-pax-looking-at-monitor.jpeg?c=16x9&q=w_800,c_fill" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "unknown author" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>

          </div>
        </div>
      </div>
    );
  }


export default NewsItems;
