import styled from 'styled-components';

export const StyledAuthPage = styled.div`
  width: 100%;
  background: #ffffff;
  min-height: 100vh;
  max-width: ${({ theme }) => theme.breakpoints.smallScreen};
  padding-top: 60px;
  padding-bottom: 60px;

  @media (min-width: ${({ theme }) => theme.breakpoints.smallScreenUp}) {
    min-height: auto;
    width: 400px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    box-shadow: 10px 10px 14px 0.2px rgba(0, 0, 0, 0.25);
  }
`;

export const StyledAuthPageTitle = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0px;

  @media (min-width: ${({ theme }) => theme.breakpoints.smallScreenUp}) {
    margin: 20px 0px 0px;
  }
`;

export const StyledAuthPageWrapper = styled.div`
  max-width: 320px;
`;
