import PropTypes from 'prop-types';
import { Component } from "react";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Section } from './Section';
import { Notification } from './Notification/Notification';

export class App extends Component { 

    state = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    handleCounter = ({ target: {name } }) => {
        this.setState(prevState => ({
            [name]: prevState[name] + 1
        }))
    }

    countTotalFeedback = () => { 
        return this.state.good + this.state.neutral + this.state.bad;
    }

    countPositiveFeedbackPercentage = () => {
        if (this.countTotalFeedback() === 0) { 
            return 0;
        }
        return Math.round((this.state.good / this.countTotalFeedback()) * 100);
     }

    render() { 
        return (
            <div>
            <Section title={'Please leave feedback'}>
            <FeedbackOptions
              options={['good', 'neutral', 'bad'] }
              onLeaveFeedback={this.handleCounter}
            />  
            </Section>
            <Section title={ 'Statistics'}>
              {this.state.good > 0 || this.state.neutral > 0 || this.state.bad > 0 ?
              <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
                />
                : <Notification message={'There is feedback'} />  
              }
              </Section>
            </div>
        )
    }
}

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func,
}

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number.isRequired,
}