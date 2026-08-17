import { Diff, Trash } from "lucide-react";

const TaskForm = ({ index, register, errors, onAdd, onDelete }) => {
  return (
    <div className="task-form">
      <div className="task-header">
        <p>Add tasks according to your plan.</p>
      </div>

      <div className="form-section">
        <div className="icon-header">
          <h3>Task Details</h3>

          <div className="task-actions">
            {/* Add */}
            <div className="task-icon">
              <button type="button" className="task-icon" onClick={onAdd}>
                <Diff size={20} />
              </button>
            </div>

            {/* Delete */}
            <div className="task-icon">
              <button type="button" className="task-icon" onClick={onDelete}>
                <Trash size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor={`tasks.${index}.description`}>Description</label>

          <textarea
            id={`tasks.${index}.description`}
            placeholder="Describe your task..."
            rows={4}
            {...register(`tasks.${index}.description`)}
          />

          {errors?.tasks?.[index]?.description && (
            <p className="error">{errors.tasks[index].description.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor={`tasks.${index}.title`}>Title</label>

          <input
            type="text"
            id={`tasks.${index}.title`}
            placeholder="E.g. Complete Linked List..."
            {...register(`tasks.${index}.title`)}
          />

          {errors?.tasks?.[index]?.title && (
            <p className="error">{errors.tasks[index].title.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="form-group">
          <label htmlFor={`tasks.${index}.subject`}>Subject</label>

          <input
            type="text"
            id={`tasks.${index}.subject`}
            placeholder="E.g. DSA"
            {...register(`tasks.${index}.subject`)}
          />

          {errors?.tasks?.[index]?.subject && (
            <p className="error">{errors.tasks[index].subject.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor={`tasks.${index}.date`}>Date</label>

          <input
            type="date"
            id={`tasks.${index}.date`}
            placeholder="E.g. DSA"
            {...register(`tasks.${index}.date`)}
          />

          {errors?.tasks?.[index]?.date && (
            <p className="error">{errors.tasks[index].date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor={`tasks.${index}.start_time`}>Start time</label>

            <input
              id={`tasks.${index}.start_time`}
              type="time"
              {...register(`tasks.${index}.start_time`)}
            />

            {errors?.tasks?.[index]?.start_time && (
              <p className="error">{errors.tasks[index].start_time.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={`tasks.${index}.end_time`}>End time</label>

            <input
              id={`tasks.${index}.end_time`}
              type="time"
              {...register(`tasks.${index}.end_time`)}
            />

            {errors?.tasks?.[index]?.end_time && (
              <p className="error">{errors.tasks[index].end_time.message}</p>
            )}
          </div>
        </div>

        {/* Status + Priority */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor={`tasks.${index}.status`}>Status</label>

            <select
              id={`tasks.${index}.status`}
              {...register(`tasks.${index}.status`)}>
              <option value="PENDING">PENDING</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="SKIPPED">SKIPPED</option>
            </select>

            {errors?.tasks?.[index]?.status && (
              <p className="error">{errors.tasks[index].status.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={`tasks.${index}.priority`}>Priority</label>

            <select
              id={`tasks.${index}.priority`}
              {...register(`tasks.${index}.priority`)}>
              <option value="HIGH">HIGH</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
            </select>

            {errors?.tasks?.[index]?.priority && (
              <p className="error">{errors.tasks[index].priority.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
