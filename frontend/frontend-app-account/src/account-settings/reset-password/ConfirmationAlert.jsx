import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Alert from '../Alert';

function ConfirmationAlert(props) {
  const { email } = props;

  const technicalSupportLink = (
    <Hyperlink
      destination={getConfig().PASSWORD_RESET_SUPPORT_LINK}
    >
      <FormattedMessage
        id="account.settings.editable.field.password.reset.button.confirmation.support.link"
        defaultMessage="technical support"
        description="link text used in message: account.settings.editable.field.password.reset.button.confirmation 'Contact technical support.'"
      />
    </Hyperlink>
  );

  return (
    <Alert
      className="alert-warning mt-n2"
      icon={<FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />}
    >
      <FormattedMessage
        id="account.settings.editable.field.password.reset.button.confirmation"
        defaultMessage="We've sent a message to {email}. Click the link in the message to reset your password. Didn't receive the message? Contact {technicalSupportLink}."
        description="The password reset button in account settings"
        values={{
          email,
          technicalSupportLink,
        }}
      />
    </Alert>
  );
}

ConfirmationAlert.propTypes = {
  email: PropTypes.string.isRequired,
};

export default ConfirmationAlert;
