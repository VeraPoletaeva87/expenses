import React, { useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { userSchema } from './userValidation';
import { useForm } from 'react-hook-form';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginContext } from './loginContext';
import style from './dialog.css';
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
  const loginValue = useContext(LoginContext);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  async function onhandleSubmit(data) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(() => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
        });
      });
      loginValue.setLogin(true);

    } catch (error) {
    }
  }

  return (
    <div className='subContainer'>
      <ToastContainer />
      <h1 className='registerHeader'>
      Create an account
      </h1>
      <form
        data-testid="form__registr"
        onSubmit={handleSubmit(onhandleSubmit)}
        className='registerForm'
      >
        <div>
          <div className='nameReg'>
            <input
              id="nameReg"
              type="name"
              defaultValue=""
              placeholder="Name"
              {...register('name')}
            />
            <p className='errorText'>
              {errors.name && (
                <small className='textDanger'>
                  {errors.name.message}
                </small>
              )}
            </p>
          </div>
          <div className='emailReg'>
            <input
              id="emailReg"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            <p className='errorText'>
              {errors.email && (
                <small className='textDanger'>
                 {errors.email.message}
                </small>
              )}
            </p>
          </div>
          <div className='passwordReg'>
            <input
              id="passwordReg"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            <div className='errorText'>
              {errors.password && (
                <p className='pre'>
                  <small className='textDanger'>
                   {errors.password.message}
                  </small>
                </p>
              )}
            </div>
          </div>
          <div className='confirmPasswordReg'>
            <input
              id="confirmPasswordReg"
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <p className='errorText'>
              {errors.confirmPassword && (
                <small className='textDanger'>
               {errors.confirmPassword?.message}
                </small>
              )}
            </p>
          </div>
          <button type="submit">
           Sign-up
          </button>
        </div>
      </form>
    </div>
  );
};
export default Registration;