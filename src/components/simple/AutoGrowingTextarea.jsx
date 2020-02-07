import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.25rem;
`

const Text = styled.textarea`
    overflow: hidden;
    resize: none;
`

const ErrorField = styled.span`
    color: #e54b4b;
    font-size: 0.7rem;
    font-weight: 600;
`

export default class AutoGrowingTextarea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isTooLongValue: false,
        }
    }

    /**
     * Make textarea height adjustable to the content height up to the minimum height value, which set from constant.
     * Method relies on overflow='hidden' of the target textarea,
     *  in other case we can see scroll blink at moving to the new line during the typing
     * Cases with boxSizing of target textarea different from the 'content-box' or 'border-box' are not supported
     * @param e - onKeyUp event on textarea
     */
    autoGrow = ({target}) => {
        const minHeight = this.props.minHeight || 50; // let's set the minimum height of textarea

        const style = target.currentStyle || window.getComputedStyle(target);

        const rect = target.getBoundingClientRect();

        target.style.height = minHeight + 'px';

        if (rect.height < target.scrollHeight || rect.height > minHeight) {
            if (style.boxSizing === 'content-box') {
                //target.style.height = minHeight + 'px';
                target.style.height = (target.scrollHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom)) + 'px';
            }

            if (style.boxSizing === 'border-box') {
                //target.style.height = minHeight + 'px';
                target.style.height = (target.scrollHeight) + 'px';
            }
        }

        if (this.textArea.value.length >= this.props.maxLength && !this.state.isTooLongValue) {
            this.setState({isTooLongValue: !this.state.isTooLongValue})
        }

        if (this.textArea.value.length < this.props.maxLength && this.state.isTooLongValue) {
            this.setState({isTooLongValue: !this.state.isTooLongValue})
        }
    }

    componentDidMount() {
        this.autoGrow({target: this.textArea});
    }

    render() {
        return <Container>
            <Text {...this.props} onKeyUp={this.autoGrow} innerRef={(el) => this.textArea = el}/>
            {this.props.maxLength && this.state.isTooLongValue && <ErrorField>Ви ввели недопустиму кількість символів</ErrorField>}
        </Container>
    }
}
