import styled from 'styled-components';

export const Alert = styled.div`
  padding: 10px;
  margin: 0px auto;
`;

export const StyledAlert = styled(Alert)`
  background: ${({ theme, type }) => theme.colors[type].light};
  color: ${({ theme, type }) => theme.colors[type].dark};
  border: 1px solid ${({ theme, type }) => theme.colors[type].dark};
`;

export const StyledAlertDanger = styled(Alert)`
  background: ${({ theme }) => theme.colors.danger.light};
  color: ${({ theme }) => theme.colors.danger.dark};
  border: 1px solid ${({ theme }) => theme.colors.danger.dark};
`;

export const StyledAlertWarning = styled(Alert)`
  background: ${({ theme }) => theme.colors.warning.light};
  color: ${({ theme }) => theme.colors.warning.dark};
  border: 1px solid ${({ theme }) => theme.colors.warning.dark};
`;
export const StyledAlertInfo = styled(Alert)`
  background: ${({ theme }) => theme.colors.info.light};
  color: ${({ theme }) => theme.colors.info.dark};
  border: 1px solid ${({ theme }) => theme.colors.info.dark};
`;
export const StyledAlertSuccess = styled(Alert)`
  background: ${({ theme }) => theme.colors.success.light};
  color: ${({ theme }) => theme.colors.success.dark};
  border: 1px solid ${({ theme }) => theme.colors.success.dark};
`;
