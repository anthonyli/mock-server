import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import editForm from 'com/Project/editForm'
import * as ProjectActions from '../../actions/ProjectActions'
import 'com/Project/index.less'

function mapStateToProps(state) {
  const project = state.get('project')
  return {
    user: state.get('user'),
    project: project.get('editProject'),
    showEditModal: project.get('showEditModal'),
    projectList: state.get('project').get('projectList'),
    allUsers: state.get('allUsers')
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editForm)
