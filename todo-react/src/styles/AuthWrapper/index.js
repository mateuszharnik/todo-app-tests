import styled from 'styled-components';

const StyledAuthWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  background-image: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary}
    ${({ theme }) => theme.colors.primaryDarken}
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.smallScreenUp}) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
  }
`;

export default StyledAuthWrapper;
