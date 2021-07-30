const useTextareaLength = ({ content, hasMaxLength, maxLength }) => (''.concat(content).concat(hasMaxLength ? ' / '.concat(maxLength) : ''));

export default useTextareaLength;
