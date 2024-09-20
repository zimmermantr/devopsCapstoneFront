import styled from 'styled-components';


const FeatureCont = styled.div`
        width: 30%;
        height: 15rem;
        text-align: center;
        border: 1px rgb(61, 61, 61) solid;
        border-radius: 2rem;
        padding: 5px;

        
        background: #8a919e05;
        
        &:hover {
            border: #c776f6b7 1px solid;
            box-shadow: 1px 5px 30px 1px #e8c0ffb7;
            background: #8a919e25;
        }
        
        `;
        
const FeatureInfo = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

`
    
const FeatureTitle = styled.div`
        padding: 1rem;
        font-size: 1.5rem;
        `;

const FeatureDescr = styled.p`

        `;

const FeatureImg = styled.img`

        `;


export const Features = ({imageSRC, title, description}) => {

    return (
        <FeatureCont>
            <FeatureInfo>
                <FeatureImg src={imageSRC} alt='img' />
                <FeatureTitle>{title}</FeatureTitle>
                <FeatureDescr>{description}</FeatureDescr>
            </FeatureInfo>

        </FeatureCont>
    )
};

export default Features;
