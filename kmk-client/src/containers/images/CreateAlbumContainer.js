import { connect } from 'react-redux';
import { CreateAlbumPage } from '../../pages/images/CreateAlbumPage';
import { createAlbum } from '../../actions/album';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createAlbum: (request) => dispatch(createAlbum(request))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlbumPage)