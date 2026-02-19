import styled from "styled-components";

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
        <div className="modalOverlay" onClick={onCancel}>
            <div className="modalBox" onClick={(e) => e.stopPropagation()}>
                <div className="modalTitle">{title}</div>
                <div className="contents">{children}</div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '40px'}}>
                    {cancelText && (
                        <CancelBtn onClick={onCancel}>{cancelText}</CancelBtn>
                    )}
                    <ConfirmBtn onClick={onConfirm}>{confirmText}</ConfirmBtn>
                </div>
            </div>
        </div>
    );
};

export default Modal;