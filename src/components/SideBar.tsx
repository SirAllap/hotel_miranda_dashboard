import React, { useEffect, useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import logo from '../assets/logo_dashboard1.png'
import { NavLink } from 'react-router-dom'
import { LuLayoutDashboard } from 'react-icons/lu'
import { SlKey } from 'react-icons/sl'
import { LuCalendarCheck2 } from 'react-icons/lu'
import { SlPeople } from 'react-icons/sl'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supertoggleContext } from '../context/ToggleContext'
import { authenticationContext } from '../context/AutheContext'
import * as color from './Variables'

type AuthState = {
	name?: string
	email?: string
}

const SideBar: React.FC = () => {
	const { state } = useContext(supertoggleContext)!
	const { authState, updateUserInfo } = useContext(authenticationContext)!
	const [toggleModal, setToggleModal] = useState<boolean>(false)
	const [userUpdatedName, setUpdatedUserName] = useState<string>('')
	const [userUpdatedEmail, setUpdatedUserEmail] = useState<string>('')
	const [userName1, setUserName1] = useState<string>('')
	const [userEmail1, setUserEmail1] = useState<string>('')
	const [userName, setUserName] = useState<string | null>('')
	const [userEmail, setUserEmail] = useState<string | null>('')
	const [profPic, setProfPic] = useState<string>('')
	const [file2Upload, setFile2Upload] = useState<string>()

	const handleUpdateUserName = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUpdatedUserName(event.target.value)
	}
	const handleUpdateUserEmail = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setUpdatedUserEmail(event.target.value)
	}

	useEffect(() => {
		const savedProfilePicture = authState.profilePicture
		setProfPic(
			savedProfilePicture || 'https://robohash.org/oxygen.png?set=any'
		)
		authState.name !== null && setUserName1(authState.name)
		authState.email !== null && setUserEmail1(authState.email)
	}, [profPic, authState.name, authState.email, authState.profilePicture])

	const handleToggleModal = () => {
		if (!toggleModal) {
			setToggleModal(true)
		} else {
			setToggleModal(false)
		}
	}

	const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileInput = e.target
		if (fileInput.files) {
			const newPictureUrl: string = URL.createObjectURL(
				fileInput.files[0]
			)
			setFile2Upload(newPictureUrl)
			handleUpdateAndCloseModal(newPictureUrl)
		} else {
			console.error('No files selected')
		}
	}

	interface IUpdateUserInfo {
		userName: string
		email: string
		profilePicture: string
	}

	const handleUpdateAndCloseModal = (newPictureUrl?: string) => {
		if (userUpdatedName === '') {
			setUserName(authState.name)
		} else setUserName(userUpdatedName)
		if (userUpdatedEmail === '') {
			setUserEmail(authState.email)
		} else setUserEmail(userUpdatedEmail)
		updateUserInfo({
			userName:
				userUpdatedName !== null && userUpdatedName !== ''
					? userUpdatedName
					: authState.name || '',
			email:
				userUpdatedEmail !== null && userUpdatedEmail !== ''
					? userUpdatedEmail
					: authState.email || '',
			profilePicture:
				typeof newPictureUrl === 'string'
					? newPictureUrl
					: authState.profilePicture || '',
		})

		setTimeout(() => {
			setToggleModal(false)
		}, 400)
	}

	if (authState.auth)
		return (
			<>
				<EditUserModalOverlay
					onClick={handleToggleModal}
					open={toggleModal}
				/>
				<EditUserModal open={toggleModal}>
					<EditUserInputLable type='name' htmlFor='name'>
						Name
					</EditUserInputLable>
					<Input
						id='name'
						name='name'
						defaultValue={
							userUpdatedName ? userUpdatedName : authState.name
						}
						type='name'
						placeholder='name'
						onChange={handleUpdateUserName}
						autoComplete='off'
					/>
					<EditUserInputLable type='email' htmlFor='email'>
						Email
					</EditUserInputLable>

					<Input
						id='email'
						name='email'
						defaultValue={
							userUpdatedEmail
								? userUpdatedEmail
								: authState.email
						}
						type='email'
						placeholder='email'
						onChange={handleUpdateUserEmail}
						autoComplete='off'
					/>

					<UserCardProfilePictureModal
						src={!file2Upload ? profPic : file2Upload}
					/>
					<InputFile
						type='file'
						onChange={handlePictureChange}
						alt='a photo of the user profile'
					/>
					<SaveCTA
						onClick={() => {
							handleUpdateAndCloseModal()
						}}
					>
						Save
					</SaveCTA>
					<CloseCTA onClick={handleToggleModal}>
						<AiOutlineCloseCircle />
					</CloseCTA>
				</EditUserModal>
				<Container data-testid='sidebarToggle' toggle={state.position}>
					<LogoSection>
						<NavLink to={'/'}>
							<LogoImage
								src={logo}
								alt='a logo of the hotel dashboard'
							/>
						</NavLink>
					</LogoSection>
					<IconSection>
						<MenuItems to='/'>
							<VerticalDivider />
							<LuLayoutDashboard />
							<MenuItemText>Dashboard</MenuItemText>
						</MenuItems>
						<MenuItems to='/rooms'>
							<VerticalDivider className='left-decoration' />
							<SlKey />
							<MenuItemText>Rooms</MenuItemText>
						</MenuItems>
						<MenuItems to='/bookings'>
							<VerticalDivider className='left-decoration' />
							<LuCalendarCheck2 />
							<MenuItemText>Bookings</MenuItemText>
						</MenuItems>
						<MenuItems to='/contact'>
							<VerticalDivider className='left-decoration' />
							<MdOutlineRateReview />
							<MenuItemText>Contact</MenuItemText>
						</MenuItems>
						<MenuItems to='/users'>
							<VerticalDivider className='left-decoration' />
							<SlPeople />
							<MenuItemText>Employees</MenuItemText>
						</MenuItems>
					</IconSection>
					<UserCardInfo>
						<UserCardProfilePictureVoid src={profPic} />
						<UserCardText type='name'>
							{!userName ? userName1 : userName}
						</UserCardText>
						<UserCardText>
							{!userEmail ? userEmail1 : userEmail}
						</UserCardText>
						<UserCardButton onClick={handleToggleModal}>
							Edit user
						</UserCardButton>
					</UserCardInfo>
					<SideBarFooter>
						<SideBarFooterText type='title'>
							Travl Hotel Admin Dashboard
						</SideBarFooterText>
						<SideBarFooterText type='copyright'>
							© 2020 All Rights Reserved
						</SideBarFooterText>
						<SideBarFooterText>
							Made with ♥ by DPR
						</SideBarFooterText>
					</SideBarFooter>
					<NavLink to='/contact'></NavLink>
				</Container>
			</>
		)
	return null
}

export default SideBar

interface ContainerProps {
	readonly toggle: string
}

const Container = styled.aside<ContainerProps>`
	min-width: 345px;
	height: 100vh;
	background-color: ${color.clearBackground};
	float: left;
	margin-left: ${(props) => (props.toggle === 'close' ? '-345px' : 0)};
	transition: 0.3s all ease;
	box-shadow: ${color.softer_ligthGrey} 0px 8px 24px;
`

const LogoSection = styled.section`
	height: fit-content;
	width: 345px;
	text-align: center;
	margin: 20px auto 20px auto;
`

const LogoImage = styled.img`
	width: 100px;
	object-fit: contain;
`

const IconSection = styled.section`
	width: 100%;
	max-height: 375px;
`

const VerticalDivider = styled.div`
	visibility: hidden;
	width: 8px;
	height: 64px;
	border-radius: 0 6px 6px 0;
	position: relative;
	right: 63px;
	transition: 0.1s;
`

const MenuItems = styled(NavLink)`
	height: 67px;
	margin: 0 0 0 63px;
	display: flex;
	align-items: center;
	text-align: right;
	font-size: 25px;
	color: ${color.softer_normalGrey};
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: ${color.strongPurple};
		${VerticalDivider} {
			transition: 0.2s;
			background-color: ${color.strongPurple};
			width: 19px;
		}
	}
	&:hover :nth-child(1) {
		visibility: visible;
	}
	&:focus,
	&:hover,
	&:visited,
	&:link {
		text-decoration: none;
	}
	&.active {
		color: ${color.softer_strongPurple};
		&:hover {
			color: ${color.softer_strongPurple};
		}
		${VerticalDivider} {
			transition: 0.2s;
			visibility: visible;
			background-color: ${color.softer_strongPurple};
		}
	}
`

const MenuItemText = styled.p`
	font: normal normal 600 18px/27px Poppins;
	margin-left: 26px;
`

const UserCardInfo = styled.div`
	width: 233px;
	height: 221px;
	border-radius: 18px;
	background-color: ${color.clearBackground};
	box-shadow: 0px 20px 30px ${color.softer_ligthGrey};
	margin: 0 auto;
	text-align: center;
	margin-top: 31px;
`

const UserCardProfilePictureVoid = styled.img`
	background: ${(props) =>
		props.src ? 'transparent' : '${color.normalGrey}'};
	width: 70px;
	height: 70px;
	border-radius: 8px;
	margin: 0 auto;
`
interface UserCardTextProps {
	readonly type?: string
}

const UserCardText = styled.p<UserCardTextProps>`
	${(props) => {
		switch (props.type) {
			case 'name':
				return css`
					font: normal normal 500 16px/1.2 Poppins;
					color: ${color.strongGrey};
					margin: 15px 0 9px 0;
				`
			default:
				return css`
					font: normal normal 300 12px/1.2 Poppins;
					color: ${color.softer_normalGrey};
				`
		}
	}}
`

const UserCardButton = styled.button`
	width: 158px;
	height: 47px;
	background-color: ${color.softer_ligthPinkie};
	border: none;
	border-radius: 8px;
	color: ${color.normalPinkie};
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: ${color.clearBackground};
		background-color: ${color.softer_normalPinkie};
	}
`

const SideBarFooter = styled.div`
	width: 242px;
	height: 135px;
	margin: 42px auto 0px auto;
`
interface SideBarFooterTextProps {
	readonly type?: string
}

const SideBarFooterText = styled.p<SideBarFooterTextProps>`
	${(props) => {
		switch (props.type) {
			case 'title':
				return css`
					font: normal normal 600 16px Poppins;
					color: ${color.strongGrey};
					margin: 0 0 10px 0;
				`
			case 'copyright':
				return css`
					font: normal normal 500 14px Poppins;
					color: ${color.softer_strongGrey};
					margin: 0 0 7px 0;
				`
			default:
				return css`
					font: normal normal 500 14px Poppins;
					color: ${color.softer_normalPinkie};
				`
		}
	}}
`

interface EditUserModalOverlayProps {
	readonly open?: boolean
}
const EditUserModal = styled.div<EditUserModalOverlayProps>`
	z-index: 100;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 431px;
	min-height: 550px;
	background: ${color.clearBackground} 0% 0% no-repeat padding-box;
	border-radius: 20px;
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
interface EditUserModalOverlayProps {
	readonly open?: boolean
}
const EditUserModalOverlay = styled.div<EditUserModalOverlayProps>`
	z-index: 99;
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: ${color.softer_normalGrey};
	transition: all 0.5s;
	display: ${(props) => (props.open ? 'block' : 'none')};
`
const SaveCTA = styled.button`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 0px;
	width: 90%;
	height: 47px;
	color: ${color.normalPinkie};
	background-color: ${color.ligthPinkie};
	border: none;
	border-radius: 8px;
	font: normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: ${color.clearBackground};
		background-color: ${color.softer_normalPinkie};
	}
`

const UserCardProfilePictureModal = styled(UserCardProfilePictureVoid)`
	width: 130px;
	height: 130px;
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 85px;
	&:hover {
		opacity: 0.8;
	}
`

const CloseCTA = styled.button`
	position: absolute;
	right: 13px;
	top: 13px;
	font-size: 25px;
	border: none;
	background-color: transparent;
	color: ${color.normalGrey};
	transition: 0.3s all;
	&:hover {
		color: ${color.normalPinkie};
	}
`

const InputFile = styled.input`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	top: 77%;
	transform: translate(-50%, -50%);
	max-width: 28%;
	transition: 0.3s;
	color: ${color.normalGrey};
	background: ${color.clearBackground};
	&::file-selector-button {
		font: normal normal 500 14px Poppins;
		border: none;
		color: white;
		background-color: ${color.softer_normalPurple};
		padding: 10px 20px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.2s ease-in-out;
	}
	&::file-selector-button:hover {
		color: ${color.normalPurple};
		background-color: ${color.ligthPurple};
	}
`

interface InputProps {
	type: string
}

const Input = styled(InputFile)<InputProps>`
	top: ${(props) => (props.type === 'email' ? '37%' : '15%')};
	height: 47px;
	width: 100%;
	max-width: 90%;
	background-color: ${color.clearBackground};
	border: 2px solid ${color.ligthPurple};
	color: ${color.strongPurple};
	outline: none;
	font: normal normal 500 14px Poppins;
	border-radius: 8px;
	padding: 15px;
	margin-top: 16px;
	&:focus {
		outline: 2px solid ${color.softer_ligthPurple};
	}
`
interface EditUserInputLableProps {
	readonly type: string
}
const EditUserInputLable = styled.label<EditUserInputLableProps>`
	position: absolute;
	left: 2%;
	margin-right: -50%;
	top: ${(props) => (props.type === 'email' ? '32%' : '10%')};
	transform: translate(-50%, -50%);
	font: normal normal 600 17px Poppins;
	display: block;
	color: ${color.strongPurple};
	margin-left: 40px;
`
