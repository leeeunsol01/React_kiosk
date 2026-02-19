import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 1000;
`; 

const ModalBox = styled.div`
    width: 769px;
    background-color: white;
    border-radius: 50px;
    z-index: 10000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalTitle = styled.div`
    width: 769px;
    height: 130px;
    border-radius: 50px 50px 0 0;
    background-color: #FDA2B9;
    color: white;
    font-size: 42px;
    text-align: center;
    line-height: 130px;
`;

const Contents = styled.div`
    padding: 70px 102px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CancelBtn = styled.button`
    width: 150px;
    height: 80px;
    font-size: 36px;
    border: 1px solid #6E6E6E;
    background-color: ${props => props.$isActive ? '#BDBDBD' : 'white'};
    border-radius: 50px;
`;

const ConfirmBtn = styled.button`
    width: 150px;
    height: 80px;
    font-size: 36px;
    border: none;
    background-color: ${props => props.$isActive ? '#FDA2B9' : '#BDBDBD'};
    color: white;
    border-radius: 50px;
    &:active{
        background-color: #FDA2B9;
    }
`;

const Modal = ({children, title, confirmText, onConfirm, cancelText, onCancel}) => {
    return(
        <ModalOverlay onClick={onCancel}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                <Contents>{children}</Contents>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '40px'}}>
                    {cancelText && (
                        <CancelBtn onClick={onCancel}>{cancelText}</CancelBtn>
                    )}
                    <ConfirmBtn onClick={onConfirm}>{confirmText}</ConfirmBtn>
                </div>
            </ModalBox>
        </ModalOverlay>
    );
};

export default Modal;