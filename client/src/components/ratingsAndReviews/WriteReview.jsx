import React from 'react';
import RadioBtn from './RadioBtn.jsx';
import StarWriteReview from './StarWriteReview.jsx';
import './WriteReview.css';
import StarNoFill from './svg/starNoFill.svg';
import StarYellow from './svg/starYellow.svg';


class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      starsArray: [false, false, false, false, false],
      product_id: '',
      date: '',
      rating: 0,
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      photos: [],
      fit: '',
      fitID: '',
      length: '',
      lengthID: '',
      comfort: '',
      comfortID: '',
      quality: '',
      qualityID: '',
      postParams: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.selectBtn = this.selectBtn.bind(this);
    this.setStar = this.setStar.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleStarChange(e) {
    this.setState({
      [e.target.getAttribute('name')]: e.target.getAttribute('value')
    })
  }

  handleSubmit(e) {
    let st = this.state;
    e.preventDefault();
    this.setState({
      date: new Date(),
      postParams: {
        product_id: Number(st.product_id),
        rating: Number(st.rating),
        summary: st.summary,
        body: st.body,
        recommend: st.recommend,
        name: st.name,
        email: st.email,
        photos: [],
        characteristics: {
          [st.fitID]: Number(st.fit),
          [st.lengthID]: Number(st.length),
          [st.qualityID]: Number(st.quality),
          [st.comfortID]: Number(st.comfort)
        }
      }
    },
    () => { this.props.submitWriteReview(this.state.postParams) });
  }

  handleBoolean(e) {
    e.target.value === 'true'
    ? this.setState({ recommend: true })
    : this.setState({ recommend: false });
  }

  componentDidMount() {
    let meta = this.props.productMetadata;
    let metaChar = meta.characteristics;
    this.setState({
      product_id: meta.product_id,
      fitID: metaChar.Fit.id,
      lengthID: metaChar.Length.id,
      qualityID: metaChar.Quality.id,
      comfortID: metaChar.Comfort.id
    })
  }

  handleMouseEnter(e){
    let select = new Array(Number(e.target.getAttribute('value'))).fill(true);
    let unselect = new Array(5 - select.length).fill(false);
    return !this.state.selected
      ? this.setState({ starsArray: select.concat(unselect) })
      : null
  }

  handleMouseLeave(e) {
    !this.state.submited
      ? this.setState({ starsArray: new Array(5).fill(false)})
      : null
  }

  selectBtn(e) {
    console.log('select btn', e.target)
    this.handleStarChange(e);
    e.target.setAttribute('selected', '');
    this.setState({ selected: true, starsArray: this.state.starsArray })
  }

  setStar(index) {
    console.log('index', index)
    return this.state.starsArray[index - 1] && !this.state.selected
      ? StarYellow
      : StarNoFill
  }

  render () {
    return (
      <div id='backdrop-write-review'>
        <div id='write-review-contents'>
          <div id='exit'>
            <button onClick={this.props.exit}>X</button>
          </div>
          <h3>Submit your review for {this.props.productInfo.name.toUpperCase()} below</h3>
          <div id='form-review-container'>
            <div id='review-stars-container'>
              How do you rate this product?
              <label
                className={this.state.selected}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onChange={this.handleChange}
                onClick={this.selectBtn}
                value='1'
                name='rating'>
                <input
                  type='radio'
                  value='1'
                  name='rating'
                  require
                />
                <img src={this.setStar(1)} value='1'/>
              </label>
              <label className={this.state.selected}>
                <input type='radio' value='2' name='rating' onChange={this.handleChange}/>
                <img src={this.setStar(2)} />
              </label>
              <label className={this.state.selected}>
                <input type='radio' value='3' name='rating' onChange={this.handleChange}/>
                <img src={this.setStar(3)} />
              </label>
              <label className={this.state.selected}>
                <input type='radio' value='4' name='rating' onChange={this.handleChange}/>
                <img src={this.setStar(4)} />
              </label>
              <label className={this.state.selected}>
                <input type='radio' value='5' name='rating' onChange={this.handleChange}/>
                <img src={this.setStar(5)} />
              </label>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className='review-input-container'>
                <div>
                  <label className='review-input-form'>
                    Name
                    <input
                      placeholder='Name'
                      name='name'
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className='review-input-form'>
                    Email
                    <input
                      placeholder='Email'
                      name='email'
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label  className='review-input-form'>
                    Summary
                    <input
                      placeholder='Please give a breif summary of your review'
                      name='summary'
                      value={this.state.summary}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div >
                  <label className='review-input-form' >
                    Let us know what you think
                    <input
                      placeholder='1000 character max'
                      name='body'
                      value={this.state.body}
                      onChange={this.handleChange}
                      id='long-form'
                      required
                    />
                  </label>
                </div>
              </div>


              <label onChange={this.handleBoolean} value={this.state.recommend}>
                <h4>Would you recommend this item?</h4>
                <input type='radio' name='recommend' value='true' required />Yes
                <input type='radio' name='recommend' value='false' />No
              </label>
              <div>
                <span style={{padding: '3px'}}>Characteristics</span>
                <div>
                  <label onChange={this.handleChange} value={this.state.rating}>
                    Fit
                    <input type='radio' value='1' name='fit' required/>1
                    <input type='radio' value='2' name='fit'/>2
                    <input type='radio' value='3' name='fit'/>3
                    <input type='radio' value='4' name='fit'/>4
                    <input type='radio' value='5' name='fit'/>5
                  </label>
                </div>
                <div>
                  <label onChange={this.handleChange} value={this.state.rating}>
                    Length
                    <input type='radio' value='1' name='length' required/>1
                    <input type='radio' value='2' name='length'/>2
                    <input type='radio' value='3' name='length'/>3
                    <input type='radio' value='4' name='length'/>4
                    <input type='radio' value='5' name='length'/>5
                  </label>
                </div>
                <div>
                  <label onChange={this.handleChange} value={this.state.rating}>
                    Comfort
                    <input type='radio' value='1' name='comfort' required/>1
                    <input type='radio' value='2' name='comfort'/>2
                    <input type='radio' value='3' name='comfort'/>3
                    <input type='radio' value='4' name='comfort'/>4
                    <input type='radio' value='5' name='comfort'/>5
                  </label>
                </div>
                <div>
                  <label onChange={this.handleChange} value={this.state.rating}>
                    Quality
                    <input type='radio' value='1' name='quality' required/>1
                    <input type='radio' value='2' name='quality'/>2
                    <input type='radio' value='3' name='quality'/>3
                    <input type='radio' value='4' name='quality'/>4
                    <input type='radio' value='5' name='quality'/>5
                  </label>
                </div>
              </div>
              <button id='exit-write-review' onClick={this.props.exit}>Go back</button>
              <button id='submit-write-review'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default WriteReview;