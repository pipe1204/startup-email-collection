import './main.css'
import Button from '../button/Button'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const Main: React.FC = () => {

  const [fullName, setFullName] = useState('')
  const [validName, setValidName] = useState(false)


  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [confirmEmail, setConfirmEmail] = useState('')
  const [validConfirmation, setValidConfirmation] = useState(false)

  const [sending, setSending] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMesssage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  //set focus on input when modal is open
  useEffect(() => {
    inputRef.current?.focus()
  },[showModal])

  //validation of full name
  useEffect(() => {
    if(fullName.length >= 3) {
      setValidName(true)
    } else {
      setValidName(false)
    }
  },[fullName])

  //validation of email address
  useEffect(() => {
    let validRegex = new RegExp(/^[a-zA-Z.!#$%&'+/=?^_{|}~-][a-zA-Z0-9.!#$%&'+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    let result = validRegex.test(email)
    setValidEmail(result)
  },[email])

  //validation of email and email confirmation
  useEffect(() => {
    if(email === confirmEmail) {
      setValidConfirmation(true)
    } else {
      setValidConfirmation(false)
    }
  }, [confirmEmail])

  function openModal() {
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setSucess(false)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setSending(true)
    const URL = 'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth'
    axios.post(URL, {
      name: fullName,
      email,
    })
    .then(res => {
      if(res.status === 200) {
        setFullName('')
        setEmail('')
        setConfirmEmail('')
        setSucess(true)
        setSending(false)
        setError(false)
      }
    })
    .catch(err => {
      setError(true)
      setErrorMesssage(err.message)
      setSending(false)
    })
  }

  return (
    <div className={showModal ? 'main__modal__open' : 'main'}>
      <Header />
      <div className='main__content'>
        {
          sucess ? (
            <div className={showModal ? 'modal__form scale-up-center' : 'hide__modal'}>
              <div className='close__modal__content'>
                <h2 onClick={closeModal} className='gradient__text'>x</h2>
              </div>
              <div className='sucess__modal'>
                <h2>All done! 🥳</h2>
                <p>You will be one of the first to experience <br/>Broccoli & Co when we launch.</p>
                <Button onClick={closeModal}>OK</Button>
              </div>
            </div>
          ) : (
            <div className={showModal ? 'modal__form scale-up-center' : 'hide__modal'}>
              <div className='close__modal__content'>
                <h2 onClick={closeModal} className='gradient__text'>x</h2>
              </div>
              <form className='register__form'>
                <h2>Request an invite!</h2>
                <p data-testid="error" style={{visibility: fullName && !validName ? "visible" : "hidden"}} className="validation__message">Full name must have 3 or more letters</p>
                <input 
                  ref={inputRef}
                  type="text" 
                  id='fullName' 
                  placeholder='Full Name...'
                  required
                  onChange={(event) => setFullName(event.target.value)}
                  value={fullName}
                  />
                  <p data-testid="" style={{visibility: email && !validEmail ? "visible" : "hidden"}} className='validation__message'>Enter a correct email address</p>
                <input 
                  type="email" 
                  id='email' 
                  placeholder='Email address...'
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  />
                  <p data-testid="" style={{visibility: confirmEmail && !validConfirmation ? "visible" : "hidden"}} className='validation__message'>Email address must match</p>
                <input 
                  type="email" 
                  id='confirmEmail' 
                  placeholder='Confirm email address...'
                  required
                  onChange={(event) => setConfirmEmail(event.target.value)}
                  value={confirmEmail}
                  />
                <Button onClick={handleSubmit} disabled={fullName && validName && email && validEmail && confirmEmail && validConfirmation ? false : true}>{sending ? 'Please wait...' : 'Send now'}</Button>
                <p data-testid="" style={{visibility: error ? "visible" : "hidden"}} className='validation__message'>{errorMessage}</p>
              </form>
            </div>
          )
        }
        <h1>A better way <br/>to enjoy everyday</h1>
        <p className='subheading'>Be the first to know when we launch 🥦!</p>
        <Button onClick={openModal}>Request an invite</Button>
      </div>
      <Footer />
    </div>
  )
}

export default Main