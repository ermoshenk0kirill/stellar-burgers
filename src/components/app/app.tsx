import { ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, NotFound404 } from '@pages';
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo,  IngredientDetails, } from '@components';
import {ProtectedRoute} from '../protectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUserAuth } from '../../services/slices/userSlice';


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchUserAuth());
    dispatch(fetchIngredients());
  }, []);

  return(
    <div className={styles.app}>
      <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<ConstructorPage />}/>
          <Route path="/feed" element={<Feed />}/>
          <Route path="/login" element={<ProtectedRoute onlyUnAuth={true} ><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute onlyUnAuth={true}><Register /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true}><ForgotPassword /></ProtectedRoute>} />
          <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true}><ResetPassword /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute children={<Profile />}/>}/>
          <Route path="/profile/orders" element={<ProtectedRoute children={<ProfileOrders />}/>}/>
          <Route path="*" element={<NotFound404 />}/>
        </Routes>

        {backgroundLocation && (<Routes>
          <Route path="/feed/:number" element={<Modal title="" children={<OrderInfo/>} onClose={() => navigate('/feed')}/>}/>
          <Route path="/ingredients/:id" element={<Modal title="" children={<IngredientDetails/>} onClose={() => navigate('/')}/>}/>
          <Route path="/profile/orders/:number" element={<Modal title="" children={<OrderInfo/>} onClose={() => navigate('/profile/orders')}/>}/>
        </Routes>)}
    </div>
  );
};

export default App;
