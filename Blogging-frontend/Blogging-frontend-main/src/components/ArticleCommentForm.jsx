import { Field, Formik,Form } from "formik";
import React from "react";
import useCreateComment from "../hooks/useCreateComment";
import { useParams } from "react-router-dom";

function ArticleCommentForm() {
    const {slug} = useParams();
    const { isCreatingComment, createComment } = useCreateComment();

    async function onSubmit({body}, {resetForm}){
            //send the data to create comment api
            createComment({values:{
                comment: {
                    body
                }
            }, slug})
        resetForm();
    }
  return (
    <Formik onSubmit={onSubmit} initialValues={{ body: "" }}>
      {({ isSubmitting }) => (
        <>
          {/* <FormErrors /> */}
          <Form className="card comment-form">
            <div className="card-block">
              <Field
                as="textarea"
                required
                name="body"
                placeholder="Write a comment..."
                className="form-control form-control-lg"
              />
            </div>

            <div className="card-footer">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-sm btn-primary pull-xs-right"
              >
                Post Comment
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default ArticleCommentForm;
