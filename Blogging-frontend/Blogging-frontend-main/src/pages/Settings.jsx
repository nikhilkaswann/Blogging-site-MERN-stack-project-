import { Formik,Field, Form } from "formik";
import React from "react";
import { useAuth, useUserQuery } from "../hooks";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Settings() {

    const {logout} = useAuth();
    const {
        isCurrentUserLoading,
        currentUser,
        currentUserError,
    } = useUserQuery();

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    console.log('Settings',{ isCurrentUserLoading,
        currentUser,
        currentUserError,})


    async function onSubmit(values, {setErrors}){
        try {
            const {data} = await axios.put(`https://blogging-backend-hie0.onrender.com/api/user`, {user:values});

            const updatedUsername = data?.user?.username;

            logout(data?.user);

            queryClient.invalidateQueries(`/profiles/${updatedUsername}`);
            queryClient.invalidateQueries(`/user`);

            navigate(`/profile/${updatedUsername}`);


        } catch (error) {

            const {status, data} =  error.response;

            if(status === 422){
                setErrors(data.errors)
            }
            
        }
    }
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <Formik onSubmit={onSubmit} initialValues={currentUser?.user}  enableReinitialize >
              {({ isSubmitting }) => (
                <>
                  {/* <FormErrors /> */}
                  <Form>
                    <fieldset disabled={isSubmitting}>
                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="image"
                          placeholder="URL of profile pic"
                          className="form-control form-control-lg"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="username"
                          placeholder="Your Name"
                          className="form-control form-control-lg"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <Field
                         as="textarea"
                          name="bio"
                          rows={8}
                          placeholder="Short bio about you"
                          className="form-control form-control-lg"
                        />
                      </fieldset>
                      
                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="form-control form-control-lg"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control form-control-lg"
                        />
                      </fieldset>

                      <button type="submit" className="btn btn-lg btn-primary pill-xs-right" >
                        Update Settings
                      </button>
                    </fieldset>
                  </Form>
                  <hr />
                  <button onClick={() =>{ 
                    logout();

                    navigate('/');
                    
                    } } type="button" className="btn btn-outline-danger" >
                    Or click here to logout.
                  </button>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
