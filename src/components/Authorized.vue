<script>
import { isCheck } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return isCheck(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
