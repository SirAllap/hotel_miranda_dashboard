import React, { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createRoomState, initialRooms } from '../features/rooms/roomSlice'
import { supertoggleContext } from '../context/supertoggleContext'
import { createOneRoom } from '../features/rooms/roomThunks'
import { Triangle } from 'react-loader-spinner'
import { NavLink, useNavigate } from 'react-router-dom'

const CreateRoom = (props) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialRoomData = useSelector(initialRooms)
	const createRoomCurretState = useSelector(createRoomState)
	const { state } = useContext(supertoggleContext)
	const [spinner, setSpinner] = useState(false)
	const [toggleModalNewRoom, setToggleModalNewRoom] = useState(false)

	useEffect(() => {
		if (createRoomCurretState === 'pending') {
			setSpinner(true)
		} else if (createRoomCurretState === 'fulfilled') {
			setSpinner(false)
			navigate('/rooms')
		}
	}, [initialRoomData, createRoomCurretState, navigate])

	const [newRoomType, setNewRoomType] = useState('')
	const handleRoomTypeSelector = (event) => {
		switch (event.target.value) {
			case 'single':
				setNewRoomType('Single Bed')
				break
			case 'double':
				setNewRoomType('Double Bed')
				break
			case 'double_superior':
				setNewRoomType('Double Superior')
				break
			case 'suite':
				setNewRoomType('Suite')
				break
			default:
				break
		}
	}

	const [newRoomNumber, setNewRoomNumber] = useState('')
	const handleRoomNumber = (event) => {
		setNewRoomNumber(event.target.value)
	}

	const [newRoomDescription, setNewRoomDescription] = useState('')
	const handleRoomDescription = (event) => {
		setNewRoomDescription(event.target.value)
	}

	const [newRoomPrice, setNewRoomPrice] = useState(0)
	const handleRoomPrice = (event) => {
		setNewRoomPrice(parseInt(event.target.value))
	}

	const [newRoomOffer, setNewRoomOffer] = useState('false')
	const handleRadioOffer = (event) => {
		setNewRoomOffer(event.target.value)
	}

	const [newRoomDiscount, setNewRoomDiscount] = useState(0)
	const handleRadioDiscount = (event) => {
		setNewRoomDiscount(parseInt(event.target.value))
	}

	const [newRoomAmenities, setNewRoomAmenities] = useState([])
	const handleNewRoomAmenities = (event) => {
		switch (event.target.value) {
			case 'basic':
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Cozy bed area' },
					{ name: 'Free Wifi', description: 'Complimentary Wi-Fi' },
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
				])
				break
			case 'midrange':
				setNewRoomAmenities([
					{
						name: '1/2 Bathroom',
						description: 'Private half bathroom',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
				])
				break
			case 'full':
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Spacious bed area' },
					{
						name: '24-Hour Guard',
						description: 'Security available around the clock',
					},
					{
						name: 'Free Wifi',
						description: 'High-speed internet access',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
					{
						name: 'Nice Views',
						description: 'Scenic views from the room',
					},
				])
				break
			case 'premium':
				setNewRoomAmenities([
					{ name: '1/3 Bed Space', description: 'Spacious bed area' },
					{
						name: '24-Hour Guard',
						description: 'Security available around the clock',
					},
					{
						name: 'Free Wifi',
						description: 'High-speed internet access',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
					{ name: 'Bathtub', description: 'Luxurious bathtub' },
					{ name: 'Jacuzzi', description: 'Private Jacuzzi' },
					{
						name: 'Nice Views',
						description: 'Scenic views from the room',
					},
				])
				break
			default:
				break
		}
	}

	function randomID() {
		return Math.floor(Math.random() * 1000000).toString()
	}
	const handleCreateOneRoom = () => {
		const newRoom = {
			room_number: newRoomNumber,
			id: randomID(),
			room_photo: [
				'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			],
			room_type: newRoomType,
			description: newRoomDescription,
			amenities: newRoomAmenities,
			price: newRoomPrice,
			offer_price: newRoomOffer === 'true' ? true : false,
			discount: newRoomDiscount,
			status: 'Available',
		}
		dispatch(createOneRoom(newRoom))
		handleToggleModalNewRoom()
	}

	const [autoAddDescription, setAutoAddDescription] = useState(false)
	const quickAddDescription = () => {
		setAutoAddDescription(true)
		setNewRoomDescription(
			'Experience the epitome of luxury and comfort in our Double Superior room. This spacious and elegantly appointed room is designed to provide you with the utmost relaxation and convenience during your stay. With a modern and stylish decor, it offers a serene oasis in the heart of the city.'
		)
	}

	const handleToggleModalNewRoom = () => {
		if (!toggleModalNewRoom) {
			setToggleModalNewRoom(true)
		} else {
			setToggleModalNewRoom(false)
		}
	}

	return (
		<>
			<MainContainer toggle={state.position}>
				<NavLink to={'/rooms'}>
					<CTA>Back</CTA>
				</NavLink>
				<TitleText newroom='title'>Create New Room</TitleText>
				<ModalInnerInfo>
					{spinner ? (
						<SpinnerContainer>
							<Triangle
								height='150'
								width='150'
								color='#135846'
								ariaLabel='triangle-loading'
								wrapperClassName=''
								visible={spinner}
							/>
						</SpinnerContainer>
					) : (
						<>
							<ModalInnerLeftInfo>
								<CreateRoomInputLable htmlFor='roomType'>
									Room Type:
								</CreateRoomInputLable>
								<RoomTypeSelector
									name='roomType'
									id='roomType'
									onChange={handleRoomTypeSelector}
									defaultValue='roomtype'
								>
									<option value='roomtype' disabled hidden>
										Select the room type:
									</option>
									<option value='single'>Single Bed</option>
									<option value='double'>Double Bed</option>
									<option value='double_superior'>
										Double Superior
									</option>
									<option value='suite'>Suite</option>
								</RoomTypeSelector>

								<CreateRoomInputLable htmlFor='roomNumber'>
									Room Number:
								</CreateRoomInputLable>
								<CreateRoomInput
									name='roomNumber'
									id='roomNumber'
									type='number'
									placeholder='e.g: 207'
									min='101'
									max='910'
									onChange={handleRoomNumber}
								/>
								<Info>
									There are a total of 9 floors in the
									building, with each floor consisting of 10
									rooms. To maintain a consistent numbering
									system, the first room on each floor is
									designated as room 101, while the last room
									is numbered as room 110. This numbering
									scheme is applied uniformly across all
									floors.
								</Info>

								<CreateRoomInputLable htmlFor='roomDescription'>
									Description:
								</CreateRoomInputLable>
								<CreateRoomTextArea
									id='roomDescription'
									name='roomDescription'
									onChange={handleRoomDescription}
									defaultValue={
										autoAddDescription
											? 'Experience the epitome of luxury and comfort in our Double Superior room. This spacious and elegantly appointed room is designed to provide you with the utmost relaxation and convenience during your stay. With a modern and stylish decor, it offers a serene oasis in the heart of the city.'
											: ''
									}
								></CreateRoomTextArea>
								<ADDCTA onClick={quickAddDescription}>
									FILL
								</ADDCTA>
							</ModalInnerLeftInfo>
							<ModalInnerRightInfo>
								<CreateRoomInputLable htmlFor='roomPrice'>
									Price per nigth:
								</CreateRoomInputLable>
								<CreateRoomInput
									id='roomPrice'
									name='roomPrice'
									type='number'
									placeholder='e.g: $196'
									onChange={handleRoomPrice}
								/>
								<br />
								<br />
								<br />
								<fieldset style={{ border: 'none' }}>
									<CreateRoomInputLable as='legend'>
										Offer
									</CreateRoomInputLable>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='radioNo'
									>
										No
									</CreateRoomInputLable>
									<CreateRoomInput
										checked={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='radioNo'
										name='offer'
										value='false'
										onChange={handleRadioOffer}
									/>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='radioYes'
									>
										Yes
									</CreateRoomInputLable>
									<CreateRoomInput
										radio='radio'
										type='radio'
										id='radioYes'
										name='offer'
										value='true'
										onChange={handleRadioOffer}
									/>
								</fieldset>
								<fieldset
									style={{
										border: 'none',
										opacity:
											newRoomOffer === 'false'
												? '0.4'
												: '1',
									}}
								>
									<CreateRoomInputLable
										as='legend'
										htmlFor='5'
									>
										Discount ammount:
									</CreateRoomInputLable>
									<CreateRoomInputLable
										radio='radio'
										htmlFor='5'
									>
										5%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='5'
										name='discount_ammount'
										value='5'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='10'
									>
										10%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='10'
										name='discount_ammount'
										value='10'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='15'
									>
										15%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='15'
										name='discount_ammount'
										value='15'
										onChange={handleRadioDiscount}
									/>

									<CreateRoomInputLable
										radio='radio'
										htmlFor='20'
									>
										20%
									</CreateRoomInputLable>
									<CreateRoomInput
										disabled={
											newRoomOffer === 'true'
												? false
												: true
										}
										radio='radio'
										type='radio'
										id='20'
										name='discount_ammount'
										value='20'
										onChange={handleRadioDiscount}
									/>
								</fieldset>
								<br />
								<br />
								<br />

								<CreateRoomInputLable
									type='name'
									htmlFor='roomAmenitiesSelector'
								>
									Amenities Pack:
								</CreateRoomInputLable>
								<RoomTypeSelector
									name='roomAmenitiesSelector'
									id='roomAmenitiesSelector'
									onChange={handleNewRoomAmenities}
									defaultValue='byamenities'
								>
									<option value='byamenities' disabled hidden>
										Select the amenities pack:
									</option>
									<option value='premium'>
										Premium Package
									</option>
									<option value='full'>Full Package</option>
									<option value='midrange'>
										Midrange Package
									</option>
									<option value='basic'>Basic Package</option>
								</RoomTypeSelector>
							</ModalInnerRightInfo>
						</>
					)}
					<SaveCTA onClick={handleCreateOneRoom}>Create Room</SaveCTA>
				</ModalInnerInfo>
			</MainContainer>
		</>
	)
}

export default CreateRoom

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
`

const CTA = styled.button`
	font: normal normal 600 18px Poppins;
	position: absolute;
	left: 0px;
	top: -63px;
	width: 138px;
	height: 33px;
	background-color: #ffedec;
	border: none;
	border-radius: 4px;
	color: #e23428;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		color: #fff;
		background-color: #e23428;
	}
`

const ModalInnerInfo = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: start;
	width: 100%;
	height: 600px;
	background-color: #fff;
	border-radius: 0px 0px 20px 20px;
`
const ModalInnerLeftInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`
const ModalInnerRightInfo = styled.div`
	text-align: left;
	height: 100%;
	padding: 20px;
`

const CreateRoomInputLable = styled.label`
	display: ${(props) => (props.radio === 'radio' ? 'inline' : 'block')};
	text-align: left;
	font: normal normal 500 17px Poppins;
	color: #135846;
	padding: 15px 0 10px 0;
`

const CreateRoomInput = styled.input`
	${(props) => {
		switch (props.radio) {
			case 'radio':
				return css`
					margin: 0 25px 0 5px;
				`
			default:
				return css`
					height: 47px;
					width: 400px;
					background-color: #fff;
					border: 2px solid #ebf1ef;
					border-radius: 8px;
					padding-left: 15px;
					font: 500 16px Poppins;
					color: #135846;
				`
		}
	}}
`

const Info = styled.p`
	width: 400px;
	color: #ff8000ba;
	font: 200 11px Poppins;
	text-align: justify;
`

const CreateRoomTextArea = styled.textarea`
	height: 141px;
	width: 400px;
	resize: none;
	background-color: #fff;
	border: 2px solid #ebf1ef;
	border-radius: 8px;
	padding-left: 15px;
	font: 500 16px Poppins;
	color: #135846;
`

const RoomTypeSelector = styled.select`
	height: 47px;
	width: 400px;
	border: 1px solid #135846;
	font: 500 16px Poppins;
	color: #135846;
	border: 2px solid #ebf1ef;
	border-radius: 8px;
	background-color: #fff;
	cursor: pointer;
	outline: none;
	padding-left: 15px;
	option {
		font: 500 16px Poppins;
		color: #135846;
	}
`
const SaveCTA = styled.button`
	position: absolute;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
	bottom: 0px;
	width: 90%;
	height: 47px;
	background-color: #ebf1ef;
	border: none;
	border-radius: 8px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const ADDCTA = styled.button`
	position: absolute;
	left: 35%;
	top: 50%;
	border: none;
	width: 100px;
	border-radius: 2px;
	color: #135846;
	font: normal normal 600 14px/21px Poppins;
	margin-top: 16px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #ebf1ef;
		background-color: #135846;
	}
`

const MainContainer = styled.main`
	position: relative;
	text-align: center;
	max-height: 730px;
	min-width: 1494px;
	margin-left: ${(props) => (props.toggle === 'close' ? '30px' : '395px')};
	margin-top: 50px;
	margin-right: 30px;
`

const TitleText = styled.h1`
	background-color: #fff;
	border-radius: 20px 20px 0px 0px;
	border-bottom: 1px dashed #1358464a;
	color: ${(props) => (props.newroom === 'title' ? '#135846' : '#393939')};
	font: ${(props) =>
		props.newroom === 'title' ? '600 25px Poppins' : '500 25px Poppins'};
	text-align: center;
	padding: 5px;
`