import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import categoryModal from 'com/Project/categoryModal'
import * as ProjectActions from '../../actions/ProjectActions'
import 'com/Project/index.less'

function mapStateToProps(state) {
  const project = state.get('project')
  return {
    showCategoryModal: project.get('showCategoryModal'),
    editCategory: project.get('editCategory')
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(categoryModal)
