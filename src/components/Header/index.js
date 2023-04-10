import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AudioOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Select, Input, Row, Col, Avatar, Badge, theme, Popover, Menu } from 'antd';
import TopNavbar from '@/components/Widgets/TopNavbar';
import CartModal from '@/components/CartModal';
import { handleMoney } from '@/utils';
import './Header.css';
import SourceImg from '@/assets/images';
// import demo data

function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const totalCart = cartItems.reduce((sum, object) => {
        return sum + object.price * object.quantity;
    }, 0);

    // Custom theme
    const { useToken } = theme;
    const { token } = useToken();
    //Search Variable
    const { Search } = Input;
    // Voice Search icon
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: token.colorPrimary,
            }}
        />
    );

    // Count of Cart Items
    let cartBadge = cartItems.length;
    // Search Handle
    const onSearch = (value) => console.log(value);
    // Format Money
    const navLeft: MenuProps['items'] = [
        {
            label: 'Giới thiệu',
            key: '0',
            icon: '',
        },
        {
            label: 'Tài khoản',
            key: '1',
            icon: '',
        },
        {
            label: 'Sản phẩm yêu thích',
            key: '2',
            icon: '',
        },
        {
            label: (
                <span>
                    <Link to="/tracking">Tra cứu đơn hàng</Link>
                </span>
            ),
            key: '3',
            icon: '',
        },
    ];
    const navRight: MenuProps['items'] = [
        {
            label: (
                <span>
                    Tổng đài hỗ trợ: <a href="tel:19006128">19006128</a>
                </span>
            ),
            key: '1',
            icon: '',
        },
    ];

    return (
        <header className="header-container">
            <div className="header-top">
                <div className="container">
                    <div className="header-top__container">
                        <Menu
                            mode="horizontal"
                            className="col col-left"
                            items={navLeft}
                        />
                        <Menu
                            mode="horizontal"
                            className="col col-right"
                            items={navRight}
                        />
                    </div>
                </div>
            </div>
            <div className="header-main">
                <Row className="container" align="middle" justify="space-between">
                    <Col className="col col-left">
                        <div className="header-logo__site">
                            <Link to="/">
                                <img src={SourceImg.logoWeb} alt="" />
                            </Link>
                        </div>
                    </Col>
                    <Row className="col col-center">
                        <Col className="header-location">
                            <Select
                                defaultValue="Chọn chi nhánh"
                                style={{ width: 140 }}
                                size="large"
                                options={[
                                    { value: '', label: '--Chi nhánh--', disabled: true },
                                    { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
                                    { value: 'Hà Nội', label: 'Hà Nội' },
                                    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                                    { value: 'Cần Thơ', label: 'Cần Thơ' },
                                ]}
                            />
                        </Col>
                        <Col className="header-search">
                            <Search
                                placeholder="Nhập tên sản phẩm..."
                                enterButton="Tìm kiếm"
                                size="large"
                                suffix={suffix}
                                onSearch={onSearch}
                                allowClear
                            />
                        </Col>
                    </Row>
                    <Col className="col col-right">
                        <Row className="header-action" justify="center" align="middle">
                            <Col className="header-user">
                                <Link to="/account">
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Link>
                            </Col>

                            <Popover
                                content={<CartModal cartItems={cartItems} />}
                                overlayClassName="header-cart__tooltip"
                            >
                                <Row className="header-cart">
                                    <Row>
                                        <Col className="header-cart__total">
                                            <div>
                                                <span>{handleMoney(totalCart)}</span>
                                            </div>
                                        </Col>
                                        <Col className="header-cart__list">
                                            <Badge count={cartBadge}>
                                                <Row
                                                    justify="center"
                                                    align="middle"
                                                    className="header-cart__badge"
                                                >
                                                    <ShoppingOutlined
                                                        style={{
                                                            fontSize: '2rem',
                                                            color: '#ea2b0f',
                                                        }}
                                                    />
                                                </Row>
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Row>
                            </Popover>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Row justify="center" align="center" className="header-nav">
                <TopNavbar justify="center"></TopNavbar>
            </Row>
        </header>
    );
}

function mapStateToProps(state) {
    return {
        cartItems: state.cart.cartItems,
    };
}

export default connect(mapStateToProps)(Header);
