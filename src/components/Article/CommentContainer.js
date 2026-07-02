import React from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const getCommentErrorMessages = commentErrors => {
  if (!commentErrors) {
    return [];
  }

  if (Array.isArray(commentErrors)) {
    return commentErrors;
  }

  if (typeof commentErrors.message === 'string') {
    return [commentErrors.message];
  }

  return Object.keys(commentErrors).reduce((errors, key) => {
    const value = commentErrors[key];

    if (Array.isArray(value)) {
      return errors.concat(value);
    }

    if (typeof value === 'string') {
      return errors.concat([value]);
    }

    return errors;
  }, []);
};

const CommentContainer = props => {
  const errorMessages = getCommentErrorMessages(props.commentErrors);

  if (props.currentUser) {
    return (
      <div>
        {errorMessages.length > 0 && (
          <div className="error-messages">
            <ul>
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <CommentInput currentUser={props.currentUser} slug={props.slug} />
        <CommentList comments={props.comments} currentUser={props.currentUser} slug={props.slug} />
      </div>
    );
  } else {
    return (
      <div>
        {errorMessages.length > 0 && (
          <div className="error-messages">
            <ul>
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <p>
          <a href="/login">Sign in</a>
          &nbsp;or&nbsp;
          <a href="/register">sign up</a>
          &nbsp;to add comments on this article.
        </p>

        <CommentList comments={props.comments} currentUser={props.currentUser} slug={props.slug} />
      </div>
    );
  }
};

export default CommentContainer;
