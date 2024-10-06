import './ErrorMessage.css';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className="error-message-container">
      <p>{error}</p>
    </div>
  );
};
