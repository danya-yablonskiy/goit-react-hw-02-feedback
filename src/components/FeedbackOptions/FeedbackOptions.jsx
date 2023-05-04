export const FeedbackOptions = ({ options, onLeaveFeedback }) => { 
    return  <ul>
        {options.map(option => {
            return <li key={option}>
                <button type="button" onClick={onLeaveFeedback} name={option}> {option}</button>
            </li>
         }) }
            </ul>
}
