import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastContainer } from 'react-toastify';
import { ReloadPrompt } from './components/ReloadPrompt';

import { Layout } from './layout/Layout';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/home/Home';
import { Properties } from './pages/property/Properties';
import { PropertyDetails } from './pages/property/PropertyDetails';
import { AddNewProperty } from './pages/property/AddNewProperty';
import { Leads } from './pages/leads/Leads';
import { LeadDetails } from './pages/leads/LeadDetails';
import { AddNewLead } from './pages/leads/AddNewLead';
import { Wallet } from './pages/wallet/Wallet';
import { RequestPayment } from './pages/wallet/RequestPayment';
import { LearningCenter } from './pages/learning_center/LearningCenter';


function App() {
	return (
		<AuthProvider>
			<DataProvider>
				
				<ToastContainer />
			<BrowserRouter>
			<ReloadPrompt />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/home"
						element={
							<Layout>
								<Home />
							</Layout>
						}
					/>
					<Route
						path="/properties"
						element={
							<Layout>
								<Properties />
							</Layout>
						}
					/>
					<Route
						path="/properties/:id"
						element={
							<Layout>
								<PropertyDetails />
							</Layout>
						}
					/>
					<Route
						path="/properties/new"
						element={
							<Layout>
								<AddNewProperty />
							</Layout>
						}
					/>
					<Route
						path="/leads"
						element={
							<Layout>
								<Leads />
							</Layout>
						}
					/>
					<Route
						path="/leads/:id"
						element={
							<Layout>
								<LeadDetails />
							</Layout>
						}
					/>
					<Route
						path="/leads/new"
						element={
							<Layout>
								<AddNewLead />
							</Layout>
						}
					/>
					<Route 
						path='/wallet'
						element={
							<Layout>
								<Wallet />
							</Layout>
						}
					/>
					<Route path='/wallet/request-payment' element={<Layout><RequestPayment /></Layout>} />
					<Route path='/learning-center' element={<Layout><LearningCenter /></Layout>} />
				</Routes>
			</BrowserRouter>
			</DataProvider>
		</AuthProvider>
	);
}

export default App;
