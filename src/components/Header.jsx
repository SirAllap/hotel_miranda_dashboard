import React, { useState } from 'react'
import styled from 'styled-components'
import { HiMenuAlt2 } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { LuMail } from 'react-icons/lu'
import { BiBell } from 'react-icons/bi'
import { BiMessageAltDetail } from 'react-icons/bi'
import { RiArrowDropDownLine } from 'react-icons/ri'

const HeaderBar = styled.nav`
	height: 120px;
	font-size: 18px;
	padding-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 3px 10px #00000009;
`

const LeftContainer = styled.div`
	min-width: fit-content;
	display: flex;
	align-items: center;
	margin-right: 10px;
`

const RightContainer = styled.div`
	min-width: fit-content;
	display: flex;
	align-items: center;
`

const IconStyle = styled.div`
	display: flex;
	align-items: center;
	font-size: 30px;
	color: black;
	margin: ${(props) =>
		props.menu === 'menu'
			? '0 50px 0 41px'
			: props.dropdown === 'dropdown'
			? '0 50px 0 16px '
			: props.groupofrigthicons === 'groupofrigthicons' && '0 51px 0 0 '};
	cursor: pointer;
	position: ${(props) => props.search === 'search' && 'relative'};
	left: -40px;
`

const InputSearch = styled.input`
	background-color: #f7f6f6;
	padding: 10px;
	font-size: 16px;
	width: 351px;
	height: 57px;
	border: none;
	border-radius: 12px;
`

const DashboardTitle = styled.p`
	font: normal normal 600 28px/42px Poppins;
`

const ProfilePictureVoid = styled.div`
	background-color: #c5c5c5;
	width: 60px;
	height: 60px;
	border-radius: 8px;
	margin-right: 28px;
`

const VerticalDivider = styled.div`
	width: 3px;
	height: 55px;
	border-left: solid 3px #ebebeb;
	margin-right: 20px;
`

const LanguageSelector = styled.p`
	color: #e23428;
	font: 600 18px Poppins;f
`

const Header = (props) => {
	const [openSideBar, setOpenSideBar] = useState('close')
	const handleToggleOfSideBar = () => {
		setOpenSideBar(openSideBar === 'open' ? 'close' : 'open')
		props.setToggleSideBar(openSideBar)
	}

	return (
		<>
			<HeaderBar>
				<LeftContainer>
					<IconStyle menu='menu'>
						<HiMenuAlt2 onClick={handleToggleOfSideBar} />
					</IconStyle>
					<DashboardTitle>{props.title}</DashboardTitle>
				</LeftContainer>
				<RightContainer>
					<InputSearch />
					<IconStyle search='search'>
						<BiSearch color='#6E6E6E' />
					</IconStyle>

					<IconStyle groupofrigthicons='groupofrigthicons'>
						<AiOutlineHeart color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<LuMail color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<BiBell color='#135846' />
					</IconStyle>
					<IconStyle groupofrigthicons='groupofrigthicons'>
						<BiMessageAltDetail color='#135846' />
					</IconStyle>
					<ProfilePictureVoid />
					<VerticalDivider />
					<LanguageSelector>EN</LanguageSelector>
					<IconStyle dropdown='dropdown'>
						<RiArrowDropDownLine color='#799283' />
					</IconStyle>
				</RightContainer>
			</HeaderBar>
		</>
	)
}

export default Header
