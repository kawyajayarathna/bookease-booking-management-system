export const getAdminDashboard = (_request, response) => {
  response.json({
    success: true,
    message: 'Welcome to the BookEase Admin Dashboard',
  })
}
